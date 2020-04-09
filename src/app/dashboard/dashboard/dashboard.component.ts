import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { fadeAnimation } from 'src/app/route.animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isLoggedIn = false;
  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.loginService.$login.subscribe(res => {
      if(res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.router.navigateByUrl('/');
      }
    })
  }

}
