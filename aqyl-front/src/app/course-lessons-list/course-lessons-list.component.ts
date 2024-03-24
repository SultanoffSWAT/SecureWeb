import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../models/lesson";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-course-lessons-list',
  templateUrl: './course-lessons-list.component.html',
  styleUrls: ['./course-lessons-list.component.css']
})

export class CourseLessonsListComponent implements OnInit{

  courseId : number = 0

  // lessons: Lesson[] =  [
  //   new Lesson("Introduction to Python", "Getting Started with Python", "assets/temp-videos/Python%20in%20100%20Seconds.mp4"),
  //   new Lesson("Python Basics", "Understanding Python Syntax and Variables", "assets/temp-videos/Python%20in%20100%20Seconds.mp4"),
  //
  // ]
  lessons: Lesson[] = []
  currentLesson: Lesson = new Lesson()

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}
  chooseLesson(lesson : Lesson){
    this.currentLesson = lesson
  }

  setRoute(){
    this.route.params.subscribe(params => {
      this.courseId = params['id']
    })
  }

  getCourseLessons(){
    this.courseService.getCourseLessons(this.courseId).subscribe({
      next: value => {
        this.lessons = value
        this.currentLesson = this.lessons[0]
      },
      error: err => console.log('error', err)
    })
  }

  ngOnInit(): void {
    this.setRoute()
    this.getCourseLessons()
  }
}
