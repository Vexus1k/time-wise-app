import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAuthenticationResponse } from "../../../auth/core/interfaces/IAuthenticationResponse";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../auth/core/services/AuthService";
import { NotificationService } from "../../../core/services/NotificationService";
import { IdentityService } from "../../../auth/core/services/IdentityService";
import { Validators } from "@angular/forms";
import { finalize } from "rxjs";
import { AbstractFormManager } from "../../../../assets/abstarcts/AbstarctFormManager";

@Component({
  selector: 'app-account-management-page',
  templateUrl: './account-management-page.component.html',
  styleUrls: ['./account-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountManagementPageComponent extends AbstractFormManager implements OnInit {
  public readonly authResponse: IAuthenticationResponse;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _notificationService: NotificationService,
    private readonly _identityService: IdentityService
  ) {
    super({
      firstName: { validate: true },
      lastName: { validate: true },
      email: { validate: true, validators: [Validators.email] },
      password: { validate: true, validators: [Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')] },
      phoneNumber: { validate: true, validators: [Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/)] },
      role: { validate: true, disabled: true },
    });

    this.authResponse = this._route.snapshot.data['authResponse'];
  }

  public ngOnInit(): void {
    this.form.patchValue(this.authResponse.user);
  }

  public submitForm(): void {
    this.validateForm(this.form);

    if (this.form.valid) {
      this._authService
        .updateUser(this.authResponse.user.id, this.form.value, this.authResponse.access_token)
        .pipe(finalize(() => {
          this._cdr.detectChanges();
        }))
        .subscribe((res) => {
          this.form.reset();
          this.form.patchValue(res);
          this._identityService.identity = { ...this._identityService.identity, user: res };
          this._notificationService.pushSuccess('Użytkownik został pomyślnie zaktualizowany.');
        },(error) => {
          this._notificationService.pushError('Wystąpił błąd podczas aktualizacji użytkownika.');
        });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }
}
