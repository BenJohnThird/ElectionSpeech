import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './route.animation';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  title = 'Election Speech';

  isNavbarCollapsed = true;
  isLoggedIn = false;
  private subscriptions = [];
  constructor(private loginService: LoginService) {
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      this.loginService.$login.subscribe(res => {
        this.isLoggedIn = (res) ? true: false;
      })
    )
  }

  ngOnDestroy(): void {

  }

}
