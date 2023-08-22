import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISuggestion } from "../interfaces/ISuggestion";
import { SuggestionCategoryEnum } from "../enums/SuggestionCategoryEnum";

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = 'http://localhost:8080/api/suggestions';

  constructor(
    private readonly _http: HttpClient
  ) {}

  public addSuggestion(suggestion: ISuggestion): Observable<ISuggestion> {
    return this._http.post<ISuggestion>(`${this.apiUrl}`, suggestion);
  }

  public getAllSuggestions(): Observable<ISuggestion[]> {
    return this._http.get<ISuggestion[]>(`${this.apiUrl}`);
  }

  public getSuggestionsByCategory(category: SuggestionCategoryEnum): Observable<ISuggestion[]> {
    return this._http.get<ISuggestion[]>(`${this.apiUrl}/by-category/${category}`);
  }
}
