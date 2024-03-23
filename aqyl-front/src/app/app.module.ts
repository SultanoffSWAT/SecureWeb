import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseLessonsListComponent } from './course-lessons-list/course-lessons-list.component';
import { CoursesComponent } from './courses/courses.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {UserService} from "../services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {LocalstorageService} from "../services/localstorage.service";

@NgModule({
  declarations: [
    AppComponent,
    CourseLessonsListComponent,
    CoursesComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, LocalstorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
