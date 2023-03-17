import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment == null) return;
      var accessToken = fragment?.split('&')[0].replace('access_token=', '');
      localStorage.setItem('access_token', accessToken);
    });
  }
  link = `https://oauth.vk.com/authorize?client_id=${environment.clientId}&display=page&redirect_uri=${window.location.href}&response_type=token&scope=photos`;
}
