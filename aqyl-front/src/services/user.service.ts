import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {User, UserProfile} from "../models/user";
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
    if (email == undefined) {
      console.log('undefined')
    }
    console.log(email)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access-token')
      })
    };

    return this.http.get<UserProfile>(`${this.baseUrl}user/${email}`, httpOptions)
      .pipe()
  }
}
