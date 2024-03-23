import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {LocalstorageService} from "../../services/localstorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  errorMessage = ''
  constructor(private router: Router, private userService: UserService, private localStorageService : LocalstorageService) {
  }

  user = {
    email: '',
    password: ''
  }

  signIn(){
    console.log(this.user)
    this.userService.signIn(this.user.email, this.user.password).subscribe({
      next: value => {
        console.log(value)
        this.localStorageService.set('user-token', value.access_token)
        console.log('localStorageService: ', this.localStorageService.get('user-token'))
        this.router.navigate(['/profile'])
      },
      error: error => {
        this.errorMessage = error.error.detail
      }
    })
  }
}
