import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from "rxjs";
import { NoteService } from "../services/NoteService";
import { INote } from "../interfaces/INote";


@Injectable()
export class NoteResolver implements Resolve<INote[]> {
  constructor(
    public readonly _noteService: NoteService
  ) {}

  public resolve(): Observable<INote[]> {
    return this._noteService.getAllNotes();
  }
}
