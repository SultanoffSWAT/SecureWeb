import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Course} from "../models/course";
import {Observable} from "rxjs";
import {Lesson} from "../models/lesson";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://127.0.0.1:8000/'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getCourseList(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.baseUrl}courses`, this.httpOptions)
  }

  getCourseLessons(id: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(`${this.baseUrl}courses/${id}/lessons`, this.httpOptions)
  }
}
