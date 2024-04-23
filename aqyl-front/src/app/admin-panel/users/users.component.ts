import {Component, OnInit} from '@angular/core';
import {AdminPanelUser, UserProfile} from "../../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users : AdminPanelUser[] = []
  isDeleteUserDialogOpen : boolean = false
  deletingUser : AdminPanelUser | undefined

  constructor(private router: Router, private userService: UserService) {}
  deleteUser(){
    if(this.deletingUser){
      this.userService.removeUser(this.deletingUser.id).subscribe({
        next: value => {
          this.deletingUser = undefined
          this.getAllUsers()
        },
        error: err => this.deletingUser = undefined,
      })
    }
    this.getAllUsers()
  }

  toggleDeleteUserDialog(user? : AdminPanelUser){
    if(user){
      this.deletingUser = user
    }
    this.isDeleteUserDialogOpen = !this.isDeleteUserDialogOpen
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: value => this.users = value,
      error: err => console.log('error:', err)
    })
  }
  ngOnInit(): void {
    this.getAllUsers()
  }
}
