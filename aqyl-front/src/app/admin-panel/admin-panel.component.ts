import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  isLogoutDialogOpen : boolean = false
  isDeleteUserDialogOpen : boolean = false
  deletingUser : string = ''
  constructor(private router: Router, private userService: UserService) {
  }

  logout(){
    localStorage.removeItem('user-token')
    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })
  }

  deleteUser(){
  // delete deletingUser
  }

  toggleLogoutDialog(){
    this.isLogoutDialogOpen = !this.isLogoutDialogOpen
  }

  toggleDeleteUserDialog(user? : string){
    if(user){
      this.deletingUser = user
    }
    this.isDeleteUserDialogOpen = !this.isDeleteUserDialogOpen
  }
}
