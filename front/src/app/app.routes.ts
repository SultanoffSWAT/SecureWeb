import { Routes } from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {CoursesComponent} from "./components/courses/courses.component";

export const routes: Routes = [
  {path: "sign-in",component: SignInComponent},
  {path: "sign-up",component: SignUpComponent},
  {path: "home",component: HomeComponent},
  {path: "courses",component: CoursesComponent},

];
