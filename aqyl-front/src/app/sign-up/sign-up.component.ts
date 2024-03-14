import { Component } from '@angular/core';
import { AuthService } from '../service/AuthService'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private authService: AuthService) { }
  signUp(name: string, email: string, password: string): void
  {
    this.authService.signUp(name, email, password).subscribe({
      next:(response) => {
        console.log('User register is successfully:', response);
      },
      error: (error) => {
        console.error('Error registering user:', error)
      }
    })
  }}
