import { ChangeDetectorRef, Component } from '@angular/core';
import { SuggestionCategoryEnum } from "../../core/enums/SuggestionCategoryEnum";
import { SuggestionService } from "../../core/services/SuggestionService";
import { ActivatedRoute } from "@angular/router";
import { ISuggestion } from "../../core/interfaces/ISuggestion";
import { finalize } from "rxjs";
import { NotificationService } from "../../../core/services/NotificationService";
import { AbstractFormManager } from "../../../../assets/abstarcts/AbstarctFormManager";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.scss']
})
export class SuggestionPageComponent extends AbstractFormManager {
  public suggestions: ISuggestion[];
  public readonly suggestionCategoryEnum = SuggestionCategoryEnum;
  public selectedCategory: SuggestionCategoryEnum;

  constructor(
    private readonly _suggestionService: SuggestionService,
    private readonly _route: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _notificationService: NotificationService
  ) {
    super({
      content: { validate: true, validators: [Validators.required] },
      suggestionCategory: { validate: true, validators: [Validators.required] }
    });

    this.suggestions = this._route.snapshot.data['suggestions'];
  }

  public onChangeCategory(value: SuggestionCategoryEnum): void {
    if (this.selectedCategory.toLowerCase() === "all") {
      this._suggestionService.getAllSuggestions().pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((res) => {
        this.suggestions = res;
        this._notificationService.pushSuccess(`Wyłączono sortowanie kategorii.`)
      }, error => {
        this._notificationService.pushError(`Wystąpił błąd podczas zmieniania kategorii.`)
      });
      return;
    }

    this._suggestionService.getSuggestionsByCategory(value).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe((res) => {
      this.suggestions = res;
      this._notificationService.pushSuccess(`Zmieniono kategorie na ${this.suggestionCategoryEnum[value]}.`)
    }, error => {
      this._notificationService.pushError(`Wystąpił błąd podczas zmieniania kategorii.`)
    });
  }

  public addSuggestion(): void {
    this.validateForm(this.form);

    if (this.form.valid) {
      this._suggestionService.addSuggestion(this.form.value).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe(
        (res) => {
          this.suggestions.push(res);
          this._notificationService.pushSuccess(`Dodano sugestię.`);
        }, error => {
          this._notificationService.pushError(`Błąd podczas dodawania sugestii.`);
        }
      );
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }
}
