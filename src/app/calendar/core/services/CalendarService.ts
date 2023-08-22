import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICalendarEvent } from "../interfaces/ICalendarEvent";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly _baseUrl = 'http://localhost:8080/api/calendar';

  constructor(private readonly _http: HttpClient) {}

  public getAllEvents(): Observable<ICalendarEvent[]> {
    return this._http.get<ICalendarEvent[]>(`${this._baseUrl}/events`);
  }

  public getEventsWithNotifications(): Observable<ICalendarEvent[]> {
    return this._http.get<ICalendarEvent[]>(`${this._baseUrl}/events/notifications`);
  }

  public addEvent(event: ICalendarEvent): Observable<ICalendarEvent> {
    return this._http.post<ICalendarEvent>(`${this._baseUrl}/add`, event);
  }

  public toggleNotification(eventId: number): Observable<string> {
    return this._http.patch<string>(`${this._baseUrl}/toggle-notification/${eventId}`, {});
  }

  public deleteEvent(eventId: number): Observable<string> {
    return this._http.delete<string>(`${this._baseUrl}/events/${eventId}`);
  }
}
