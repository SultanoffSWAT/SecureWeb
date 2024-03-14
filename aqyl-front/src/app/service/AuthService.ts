import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<any> {
     const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
      return this.http.post(`${this.baseUrl}/sign-in/`, { email, password }, httpOptions).pipe(
          tap((response: any) => {
              localStorage.setItem('access_token', response.access_token);
          })
      );
  }


  signUp(name: string, email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   return this.http.post(`${this.baseUrl}/sign-up/`, {name, email, password}, httpOptions).pipe(
     tap((response: any) => {
  if (response && response.access_token) {
    localStorage.setItem('access_token', response.access_token);
  }})
     );
  }}
