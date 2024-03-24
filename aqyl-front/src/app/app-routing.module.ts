import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseLessonsListComponent} from "./course-lessons-list/course-lessons-list.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {CoursesComponent} from "./courses/courses.component";
import {DialogComponent} from "./dialog/dialog.component";

export const routes: Routes = [
  {path: "sign-in",component: SignInComponent},
  {path: "sign-up",component: SignUpComponent},
  {path: "",component: HomeComponent},
  {path: "courses",component: CoursesComponent},
  {path: "profile",component: ProfileComponent},
  {path: "course-details",component: CourseLessonsListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
