import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LocalstorageService} from "../services/localstorage.service";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aqyl-front';
}
