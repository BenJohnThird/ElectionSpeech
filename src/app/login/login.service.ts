import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginSubject = new BehaviorSubject<any>('');
  $login = this.loginSubject.asObservable();
  constructor() { }

  getUsers() {
    let mockData = [
      { email: 'user@email.com', password: 'user'},
      { email: 'user2@email.com', password: 'user'},
    ];

    return mockData;
  }
}
