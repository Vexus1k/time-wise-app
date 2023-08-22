import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGoal } from "../interfaces/IGoal";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private readonly _baseUrl = 'http://localhost:8080/api/goals';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public createGoal(goalRequest: IGoal): Observable<IGoal> {
    return this._http.post<IGoal>(`${this._baseUrl}/create`, goalRequest);
  }

  public updateGoal(id: number, updatedGoal: IGoal): Observable<IGoal> {
    return this._http.put<IGoal>(`${this._baseUrl}/${id}`, updatedGoal);
  }

  public getAllGoals(): Observable<IGoal[]> {
    return this._http.get<IGoal[]>(`${this._baseUrl}`);
  }

  public deleteGoal(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${id}`);
  }
}
