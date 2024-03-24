import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isTokenActive : boolean = false

  constructor(private router: Router, private localStorageService: LocalstorageService) {}

  ngOnInit(): void {
    this.isTokenActive = this.localStorageService.get('user-token') != null
    console.log(this.isTokenActive)
  }
}
