import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from "rxjs";
import { ISuggestion } from "../interfaces/ISuggestion";
import { SuggestionService } from "../services/SuggestionService";


@Injectable()
export class SuggestionResolver implements Resolve<ISuggestion[]> {
  constructor(
    public readonly _suggestionService: SuggestionService
  ) {}

  public resolve(): Observable<ISuggestion[]> {
    return this._suggestionService.getAllSuggestions();
  }
}
