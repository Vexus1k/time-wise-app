import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractFormManager } from "../../../../assets/abstarcts/AbstarctFormManager";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/AuthService";
import { NotificationService } from "../../../core/services/NotificationService";
import { IdentityService } from "../../core/services/IdentityService";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { CalendarService } from "../../../calendar/core/services/CalendarService";
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRegisterPageComponent extends AbstractFormManager {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public isSignupActive = false;
  public isLoading = false;

  constructor(
    private readonly _authService: AuthService,
    private readonly _notificationService: NotificationService,
    private readonly _identityService: IdentityService,
    private readonly _router: Router,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _calendarService: CalendarService
  ) {
    super({
      email: { validate: true, validators: [Validators.required, Validators.email] },
      password: { validate: true, validators: [Validators.required] }
    });

    this.loginForm = this.form;
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])
    });
  }

  public toggleSlide(panel: string): void {
    this.isSignupActive = panel === 'signup';
  }

  public submitForm(): void {
    const activeForm = this.isSignupActive ? this.registerForm : this.loginForm;
    this.validateForm(activeForm);
    if (activeForm.valid) {
      this.isLoading = true;

      if (this.isSignupActive) {
        this._authService.register(this.registerForm.value).pipe(finalize(() => {
          this.isLoading = false;
          this._cdr.detectChanges();
        })).subscribe(
          response => {
            this.isSignupActive = false;
            this._notificationService.pushSuccess('Rejestracja udana! Teraz możesz się zalogować.');
          },
          error => {
            this._notificationService.pushError('Rejestracja nie powiodła się. Spróbuj ponownie później.');
          });
      } else {
        this._authService.authenticate(this.loginForm.value).pipe(finalize(() => {
          this.isLoading = false;
          this._cdr.detectChanges();
        })).subscribe(
          response => {
            if (response.user.activated) {
              this._identityService.identity = response;
              this._router.navigateByUrl('/dashboard');
              this._notificationService.pushSuccess('Logowanie udane!');
              this._calendarService.getEventsWithNotifications().subscribe((res) => {
                res.forEach((el) => {
                  this._notificationService.pushWarning(`${el.title}. Startuje: ${formatDate(el.startingDate, 'yyyy-MM-dd HH:mm', 'en')}`);
                })
              })
            } else {
              this._notificationService.pushInfo('Twoje konto jest nieaktywne. Aby je aktywować, sprawdź swoją ' +
                `skrzynkę pocztową (${response.user.email}) i postępuj zgodnie z instrukcjami w wiadomości aktywacyjnej.`);
            }
          },
          error => {
            this._notificationService.pushError('Logowanie nie powiodło się. Sprawdź swoje dane logowania i spróbuj ponownie.');
          }
        );
      }
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }
}
