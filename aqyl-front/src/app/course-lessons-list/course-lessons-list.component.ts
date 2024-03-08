import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../models/lesson";

@Component({
  selector: 'app-course-lessons-list',
  templateUrl: './course-lessons-list.component.html',
  styleUrls: ['./course-lessons-list.component.css']
})

export class CourseLessonsListComponent implements OnInit{

  lessons: Lesson[] =  [
    new Lesson("Introduction to Python", "Getting Started with Python", "assets/temp-videos/Python%20in%20100%20Seconds.mp4"),
    new Lesson("Python Basics", "Understanding Python Syntax and Variables", "assets/temp-videos/Python%20in%20100%20Seconds.mp4"),

  ]

  lessonTitle = "Hello"

  constructor() {

  }
  chooseLesson(){

  }

  ngOnInit(): void {
  }
}
