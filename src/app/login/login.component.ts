import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router, private commonService: CommonService) {}

  submit() {
    const model: LoginModel = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.authService.login(model).subscribe(x => {
      localStorage.setItem('access_token', x.accessToken);

      this.commonService.onLogined.next();
      this.commonService.isLogined = true;
      
      this.router.navigate(['/']);
    });
  }
}
