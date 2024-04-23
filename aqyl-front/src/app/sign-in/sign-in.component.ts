import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  errorMessage = ''
  constructor(private router: Router, private userService: UserService) {
  }

  user = {
    email: '',
    password: '',
  }

  signIn(){
    this.userService.signIn(this.user.email, this.user.password).subscribe({
      next: value => {
        localStorage.setItem('accessToken', value.access_token)
        this.router.navigate(['/']).then(()=>{
          window.location.reload()
        })
      },
      error: error => {
        this.errorMessage = error.error.detail
      }
    })
  }
}
