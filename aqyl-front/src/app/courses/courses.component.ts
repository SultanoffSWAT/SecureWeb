import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{
  courseListTitle = 'All courses'

  courses : Course[] = [
    new Course("Introduction to Python Programming", "Start your coding journey with Python!", "assets/course-images/python.png"),
    new Course("Introduction to Java Programming", "Start your coding journey with Java!", "assets/course-images/java.png")
  ]

  constructor(private router: Router) {}

  setCourseListTitle(){
    this.courseListTitle = this.router.url == '/profile' ? 'My courses' : 'All courses'
  }
  ngOnInit(): void {
    this.setCourseListTitle()
  }

}
