import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  scope = 'photos';
  link = `https://oauth.vk.com/authorize?client_id=${environment.clientId}&display=page&redirect_uri=${this.router.url}&response_type=token&scope=${this.scope}`;
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
