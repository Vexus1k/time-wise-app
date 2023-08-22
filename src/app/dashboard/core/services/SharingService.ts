import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISharing } from "../interfaces/ISharing";

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private readonly _baseUrl = 'http://localhost:8080/api/sharing';

  constructor(
    private readonly _http: HttpClient
  ) {}

  public getAllSharedPosts(): Observable<ISharing[]> {
    return this._http.get<ISharing[]>(`${this._baseUrl}/shared-posts`);
  }

  public sharePost(postId: number): Observable<ISharing> {
    return this._http.post<ISharing>(`${this._baseUrl}/posts/${postId}/share`, null);
  }
}
