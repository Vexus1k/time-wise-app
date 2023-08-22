import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommunity } from "../interfaces/ICommunity";
import { ICommentRequest } from "../interfaces/ICommentRequest";
import { IComment } from "../interfaces/IComment";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private readonly _baseUrl = 'http://localhost:8080/api/community';

  constructor(
    private readonly _http: HttpClient
  ) {}

  getAllCommunityPosts(): Observable<ICommunity[]> {
    return this._http.get<ICommunity[]>(`${this._baseUrl}/posts`);
  }

  public createPost(communityRequest: any): Observable<ICommunity> {
    return this._http.post<ICommunity>(`${this._baseUrl}/create-post`, communityRequest);
  }

  public addComment(commentRequest: ICommentRequest): Observable<IComment> {
    return this._http.post<any>(`${this._baseUrl}/comments`, commentRequest);
  }

  public likePost(postId: number): Observable<number> {
    return this._http.post<number>(`${this._baseUrl}/posts/${postId}/like`, null);
  }
}
