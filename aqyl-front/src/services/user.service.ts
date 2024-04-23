import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminPanelUser, User, UserProfile} from "../models/user";
import {UserToken} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<User>(`${this.baseUrl}sign-up`, user, httpOptions)
      .pipe()
  }

  signIn(email: string, password: string): Observable<UserToken>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    };

    return this.http.post<UserToken>(`${this.baseUrl}sign-in`, {email: email, password: password}, httpOptions)
      .pipe()
  }

  getUserProfile(email: string | undefined): Observable<UserProfile> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    };
    return this.http.get<UserProfile>(`${this.baseUrl}user/${email}`, httpOptions)
      .pipe()
  }

  getAllUsers(): Observable<AdminPanelUser[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    };
    return this.http.get<AdminPanelUser[]>(`${this.baseUrl}users`, httpOptions)
      .pipe()
  }

  removeUser(userId: number): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    };
    return this.http.delete<boolean>(`${this.baseUrl}users/${userId}`, httpOptions)
      .pipe()
  }

  adminVerify(): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      })
    };
    return this.http.get<boolean>(`${this.baseUrl}admin/verify`, httpOptions)
      .pipe()
  }
}
