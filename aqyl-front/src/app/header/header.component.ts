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

  constructor() {}

  ngOnInit(): void {
    this.isTokenActive = localStorage.getItem('accessToken') != null
  }
}
