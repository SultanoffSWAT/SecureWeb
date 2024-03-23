import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LocalstorageService} from "../services/localstorage.service";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'aqyl-front';

  constructor(private router: Router, private localStorageService: LocalstorageService) {
  }

  ngOnInit(): void {
    if(this.localStorageService.get('user-token')){
      this.router.navigate(['/profile'])
    }
  }
}
