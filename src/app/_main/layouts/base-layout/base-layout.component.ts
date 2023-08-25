import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { IdentityService } from "../../../auth/core/services/IdentityService";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/core/services/AuthService";
import { NotificationService } from "../../../core/services/NotificationService";
import { IAuthenticationResponse } from "../../../auth/core/interfaces/IAuthenticationResponse";
import { DarkModeService } from "../../../core/services/DarkModeService";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-base-auth-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent implements OnInit, OnDestroy {
  public isDarkMode = false;
  public isScreenToResponsive: boolean;
  public isSidebarResponsive: boolean;
  public darkModeSubscription: Subscription;
  public searchTerm = '';
  public readonly menuItems = [
    {
      name: 'Strona Główna',
      path: '/dashboard',
      iconClass: 'ri-home-line'
    },
    {
      name: 'Panel',
      path: '/suggestion',
      iconClass: 'ri-dashboard-line'
    },
    {
      name: 'Kalendarz',
      path: '/calendar',
      iconClass: 'ri-calendar-line'
    },
    {
      name: 'Zarządzanie Kontem',
      path: '/user-info/account-management',
      iconClass: 'ri-user-settings-line'
    },
    {
      name: 'Dziennik',
      path: '/note',
      iconClass: 'ri-file-text-line'
    }
  ];

  public filteredMenuItems = this.menuItems;

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _notificationService: NotificationService,
    private readonly _darkModeService: DarkModeService
  ) {}

  public ngOnInit(): void {
    this.darkModeSubscription = this._darkModeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });

    this.checkScreenSize();
  }

  public get identity(): IAuthenticationResponse {
    return this._identityService.identity;
  }

  public logout(): void {
    this._authService.logout(this._identityService.identity.access_token).subscribe(
      response => {
        this._identityService.destroyIdentity();
        this._notificationService.pushSuccess('Wylogowano pomyślnie.');
        this._router.navigateByUrl('/auth');
      },
      error => {
        this._notificationService.pushError('Wylogowanie nie powiodło się. Proszę spróbować ponownie.');
      }
    );
  }

  public toggleDarkMode(state: boolean): void {
    this._darkModeService.toggleDarkMode(state);
  }

  public toggleResponsiveSidebar(force = false): void {
    force ? this.isSidebarResponsive = true : this.isSidebarResponsive = !this.isSidebarResponsive;
  }

  public onSearchInputChange(): void {
    this.filterMenuItems(this.searchTerm);
  }

  private filterMenuItems(searchTerm: string): void {
    if (searchTerm.trim() === '') {
      this.filteredMenuItems = this.menuItems;
    } else {
      this.filteredMenuItems = this.menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  private checkScreenSize(): void {
    this.isSidebarResponsive = window.innerWidth <= 768;
    this.isScreenToResponsive = window.innerWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.checkScreenSize();
  }

  public ngOnDestroy(): void {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }
}
