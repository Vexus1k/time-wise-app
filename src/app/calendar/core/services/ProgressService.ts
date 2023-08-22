import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProgress } from "../interfaces/IProgress";
import { IProgressRequest } from "../interfaces/IProgressRequest";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private readonly _baseUrl = 'http://localhost:8080/api/progress';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public addProgress(progress: IProgressRequest): Observable<IProgress> {
    return this._http.post<IProgress>(`${this._baseUrl}/add`, progress);
  }

  public getAllProgress(): Observable<IProgress[]> {
    return this._http.get<IProgress[]>(`${this._baseUrl}`);
  }

  public deleteProgress(progressId: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${progressId}`);
  }
}
