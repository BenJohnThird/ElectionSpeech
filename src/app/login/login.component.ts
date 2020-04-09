import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { fadeAnimation } from '../route.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  public email;
  public password;
  private mockData: Array<any> = [
    { email: 'user@email.com', password: 'user'},
    { email: 'user2@email.com', password: 'user'},
  ]

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  isValidUser() {
    let isValid = false;

    isValid = this.mockData.filter(v => v.email === this.email && v.password === this.password).length > 0;

    return isValid;
  }

  loginUser() {
    if(this.isValidUser()) {
      this.router.navigateByUrl('/dashboard');
      this.loginService.loginSubject.next(true);
    }
  }

}
