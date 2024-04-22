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
import { DialogComponent } from './dialog/dialog.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersComponent } from './admin-panel/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseLessonsListComponent,
    CoursesComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    DialogComponent,
    AdminPanelComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [UserService, LocalstorageService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    } ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
