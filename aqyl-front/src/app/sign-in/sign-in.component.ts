import { Component } from '@angular/core';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private authService: AuthService) { }

   signIn(email: string, password: string): void {
    this.authService.signIn(email, password).subscribe({
      next: (response) => {
        console.log('User signed in successfully:', response);
      },
      error: (error) => {
        console.error('Error signing in:', error);
      }
    });
  }
}
