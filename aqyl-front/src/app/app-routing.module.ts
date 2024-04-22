import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseLessonsListComponent} from "./course-lessons-list/course-lessons-list.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {CoursesComponent} from "./courses/courses.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {UsersComponent} from "./admin-panel/users/users.component";
import {CoursesComponent as AdminCoursesComponent} from "./admin-panel/courses/courses.component";

export const routes: Routes = [
  {path: "sign-in",component: SignInComponent},
  {path: "sign-up",component: SignUpComponent},
  {path: "",component: HomeComponent},
  {path: "courses",component: CoursesComponent},
  {path: "profile",component: ProfileComponent},
  {path: 'courses/:id', component: CourseLessonsListComponent },
  {path: 'admin', component: AdminPanelComponent, children: [
      {path: '', component: UsersComponent },
      {path: 'users', component: UsersComponent },
      {path: 'courses', component: AdminCoursesComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
