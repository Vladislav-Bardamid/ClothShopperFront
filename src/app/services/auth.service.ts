import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  controllerName = 'auth';

  login(data: LoginModel) {
    return this.http.post<UserModel>(`${this.controllerName}/login`, data, {
      isAuthorized: false,
    });
  }

  logout() {}

  isLoggedIn() {}

  getUserData() {}
}
