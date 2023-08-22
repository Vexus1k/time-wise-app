import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from "../interfaces/ITask";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly _baseUrl = 'http://localhost:8080/api/tasks';

  constructor(
    private readonly _http: HttpClient
  ) { }

  public createTask(task: ITask): Observable<ITask> {
    return this._http.post<ITask>(this._baseUrl, task);
  }

  public getAllTasks(): Observable<ITask[]> {
    return this._http.get<ITask[]>(this._baseUrl);
  }

  public updateTask(taskId: number, updatedTask: ITask): Observable<ITask> {
    return this._http.put<ITask>(`${this._baseUrl}/${taskId}`, updatedTask);
  }

  public deleteTask(taskId: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${taskId}`);
  }
}
