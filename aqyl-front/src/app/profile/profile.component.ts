import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {jwtDecode} from "jwt-decode";
import {LocalstorageService} from "../../services/localstorage.service";
import {UserProfile} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user : UserProfile = new UserProfile()
  isLogoutDialogOpen : boolean = false

  constructor(private router: Router, private userService: UserService, private localStorageService: LocalstorageService) {
  }
  ngOnInit(): void {
    const token = this.localStorageService.get('user-token')!
    const decodedToken = jwtDecode(token)
    this.userService.getUserProfile(decodedToken.sub).subscribe({
      next: value => {
        this.user.name = value.name
        this.user.email = value.email
        console.log(value)
      },
      error: err => {
        console.log('error', err)
      }
    })
  }


  logout(){
    this.localStorageService.remove('user-token')
    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })
  }

  toggleLogoutDialog(){
    this.isLogoutDialogOpen = !this.isLogoutDialogOpen
    console.log( this.isLogoutDialogOpen)
  }
}
