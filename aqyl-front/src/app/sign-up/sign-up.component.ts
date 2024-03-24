import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  constructor(private userService: UserService) { }

  newUser = {
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
  }
  ngOnInit(): void { }

  errorMessage = ''
  successMessage = ''

  verifySigningUp() : boolean{
    return this.newUser.password == this.newUser.passwordVerify;
  }

  signUp(){
    console.log(this.newUser)
    this.successMessage = ''
    this.errorMessage = ''
    if(this.verifySigningUp()){
      this.userService.signUp(this.newUser)
        .subscribe({
          next: (response) => {
            this.successMessage = 'User created successfully!'
          },
          error: (error) => {
            this.errorMessage = error.error.detail
          }
        })
    }
  }
}
