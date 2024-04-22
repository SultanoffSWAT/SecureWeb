import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Course} from "../../models/course";
import {UserProfile} from "../../models/user";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{

  isLogoutDialogOpen : boolean = false
  constructor(private router: Router) {}

  logout(){
    localStorage.removeItem('user-token')
    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })
  }

  toggleLogoutDialog(){
    this.isLogoutDialogOpen = !this.isLogoutDialogOpen
  }
  ngOnInit(): void {
  }
}
