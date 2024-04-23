import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Course} from "../../models/course";
import {UserProfile} from "../../models/user";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{

  isLogoutDialogOpen : boolean = false
  user : UserProfile = new UserProfile()
  isAdmin = false
  constructor(private router: Router, private userService: UserService) {}

  logout(){
    localStorage.removeItem('accessToken')
    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })
  }

  toggleLogoutDialog(){
    this.isLogoutDialogOpen = !this.isLogoutDialogOpen
  }
  ngOnInit(): void {
    const token = localStorage.getItem('accessToken')!
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
    this.userService.adminVerify().subscribe({
      next: value => {
        this.isAdmin = value
      },
      error: err => {
        this.isAdmin = false
      }
    })
  }
}
