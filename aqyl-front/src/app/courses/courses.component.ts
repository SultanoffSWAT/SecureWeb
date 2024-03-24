import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course";
import {Router} from "@angular/router";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{
  courseListTitle = 'All courses'

  // courses : Course[] = [
  //   new Course("Introduction to Python Programming", "Start your coding journey with Python!", "assets/course-images/python.png", 12000),
  //   new Course("Introduction to Java Programming", "Start your coding journey with Java!", "assets/course-images/java.png", 20000)
  // ]
  courses : Course[] = []

  constructor(private router: Router, private courseService: CourseService) {}

  setupCurrentRoute(){
    this.courseListTitle = this.router.url == '/profile' ? 'My courses' : 'All courses'
  }

  getCourseList(){
    this.courseService.getCourseList().subscribe({
      next: value => this.courses = value,
      error: err => console.log('error:', err)
    })
  }
  ngOnInit(): void {
    this.setupCurrentRoute()
    this.getCourseList()
  }
}
