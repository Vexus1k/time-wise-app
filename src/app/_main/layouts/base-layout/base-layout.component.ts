import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { IdentityService } from "../../../auth/core/services/IdentityService";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/core/services/AuthService";
import { NotificationService } from "../../../core/services/NotificationService";
import { IAuthenticationResponse } from "../../../auth/core/interfaces/IAuthenticationResponse";

@Component({
  selector: 'app-base-auth-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent implements OnInit {
  public isDarkMode = false;
  public isScreenToResponsive: boolean;
  public isSidebarResponsive: boolean;
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
  public readonly supportMenuItems = [
    {
      name: 'Ustawienia',
      path: '',
      iconClass: 'ri-settings-5-line'
    },
    {
      name: 'Zgłoś',
      path: '',
      iconClass: 'ri-flag-line'
    },
    {
      name: 'Wsparcie',
      path: '',
      iconClass: 'ri-error-warning-line'
    }
  ];
  public filteredMenuItems = this.menuItems;

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.checkScreenSize();
  }

  public get identity(): IAuthenticationResponse {
    return this._identityService.identity;
  }

  public logout(): void {
    this._identityService.destroyIdentity();
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
    this.isDarkMode = state;
  }

  public toggleResponsiveSidebar(force = false): void {
    force ? this.isSidebarResponsive = true : this.isSidebarResponsive = !this.isSidebarResponsive;
  }

  public onSearchInputChange(): void {
    this.filterMenuItems(this.searchTerm);
  }

  public getNotificationTODO(): void {
    this._notificationService.pushInfo("Pracujemy nad zrobieniem tej zakładki. Proszę wrócić później.");
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
}
