import {Component, OnInit} from '@angular/core';
import {UserProfile} from "../../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users : UserProfile[] = []
  isDeleteUserDialogOpen : boolean = false
  deletingUser : UserProfile | undefined

  constructor(private router: Router, private userService: UserService) {}
  deleteUser(){
    // delete this.deletingUser
  }

  toggleDeleteUserDialog(user? : UserProfile){
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
