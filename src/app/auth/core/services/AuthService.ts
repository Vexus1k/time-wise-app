import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IAuthenticationRequest } from "../interfaces/IAuthenticationRequest";
import { IAuthenticationResponse } from "../interfaces/IAuthenticationResponse";
import { IRegisterRequest } from "../interfaces/IRegisterRequest";
import { IUserEditable } from "../interfaces/IUserEditable";
import { IUserResponse } from "../interfaces/IUserResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(
    private readonly _http: HttpClient
  ) {}

  public authenticate(request: IAuthenticationRequest): Observable<IAuthenticationResponse> {
    return this._http.post<IAuthenticationResponse>(`${this._baseUrl}/authenticate`, request);
  }

  public register(request: IRegisterRequest): Observable<IAuthenticationResponse> {
    return this._http.post<IAuthenticationResponse>(`${this._baseUrl}/register`, request);
  }

  public updateUser(id: number, updateRequest: IUserEditable, accessToken: string): Observable<IUserResponse> {
    return this._http.put<IUserResponse>(`${this._baseUrl}/update/${id}`, updateRequest);
  }

  public logout(token: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this._http.post<void>(`${this._baseUrl}/logout`, {}, { headers });
  }
}
