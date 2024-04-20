import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{
  siteKey = ''

  newUser = {
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
    recaptcha: ""
  }

  errorMessage = ''
  successMessage = ''

  formIsCompleted = false

  constructor(private userService: UserService) {
    this.siteKey = environment.recaptcha.siteKey
  }

  verifyForm(name?: string, value?: string | null){
    if(name == 'password'){
      this.formIsCompleted = this.newUser.recaptcha != '' && (value == this.newUser.passwordVerify)
      return
    } else if (name == 'passwordVerify'){
      this.formIsCompleted = this.newUser.recaptcha != '' && (this.newUser.password == value)
      return
    } else if (name == 'recaptcha') {
      this.formIsCompleted = value != null && (this.newUser.password == this.newUser.passwordVerify)
      return
    }
    this.formIsCompleted = this.newUser.recaptcha != '' && (this.newUser.password == this.newUser.passwordVerify)
  }

  signUp(){
    console.log(this.newUser)
    this.successMessage = ''
    this.errorMessage = ''
    if(this.formIsCompleted){
      this.userService.signUp(this.newUser)
        .subscribe({
          next: (response) => {
            this.successMessage = 'User created successfully!'
          },
          error: (error) => {
            this.errorMessage = error.error.detail
            console.log(error)
          }
        })
    }
  }

  resolved(captchaResponse: string | null) {
    console.log(captchaResponse ? captchaResponse : '')
    this.verifyForm('recaptcha', captchaResponse)
    this.newUser.recaptcha = captchaResponse ? captchaResponse : ""
  }
}
