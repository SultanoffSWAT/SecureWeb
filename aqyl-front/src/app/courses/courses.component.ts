import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/course";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  courses : Course[] = [
    new Course("Introduction to Python Programming", "Start your coding journey with Python!", "assets/course-images/python.png"),
    new Course("Introduction to Java Programming", "Start your coding journey with Java!", "assets/course-images/java.png")
  ]

  ngOnInit(): void {
  }

}
