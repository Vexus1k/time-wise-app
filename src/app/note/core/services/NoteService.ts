import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from "../interfaces/INote";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly _baseUrl: string = `http://localhost:8080/api/notes`;

  constructor(private http: HttpClient) {}

  public createNote(note: INote): Observable<INote> {
    return this.http.post<INote>(this._baseUrl, note);
  }

  public getAllNotes(): Observable<INote[]> {
    return this.http.get<INote[]>(`${this._baseUrl}`);
  }

  public deleteNote(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this._baseUrl}/${noteId}`);
  }
}
