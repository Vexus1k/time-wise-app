import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractFormManager } from "../../../../assets/abstarcts/AbstarctFormManager";
import { Validators } from "@angular/forms";
import { NoteService } from "../../core/services/NoteService";
import { NotificationService } from "../../../core/services/NotificationService";
import { INote } from "../../core/interfaces/INote";
import { finalize } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent extends AbstractFormManager {
  public notes: INote[];
  public contentToDisplay: string;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _noteService: NoteService,
    private readonly _notificationService: NotificationService,
    private readonly _route: ActivatedRoute
  ) {
    super({
      content: { validate: true, validators: [Validators.required] },
    });

    this.notes = this._route.snapshot.data['notes'];
  }

  public addNote(): void {
    this.validateForm(this.form);

    if (this.form.valid) {
      this._noteService.createNote(this.form.value).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((res) => {
        this._notificationService.pushSuccess('Notatka została pomyślnie dodana.');
        this.notes.push(res);
      });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }

  public deleteNote(noteId: number): void {
    this._noteService.deleteNote(noteId).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe(() => {
      this._notificationService.pushSuccess('Notatka usunięta pomyślnie.');
      this.removeNoteFromList(noteId);
    });
  }

  private removeNoteFromList(noteId: number): void {
    const index = this.notes.findIndex(note => note.id === noteId);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }
}
