import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/commonService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  priceCount = 0;
  currency = environment.currency;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.setPriceCount.subscribe((price) => {
      this.priceCount = price;
    });
    this.commonService.updatePriceCount.subscribe((price) => {
      this.priceCount += price;
    });

    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment == null) return;
      var accessToken = fragment?.split('&')[0].replace('access_token=', '');
      localStorage.setItem('accessToken', accessToken);
    });
  }
  link = `https://oauth.vk.com/authorize?client_id=${environment.clientId}&display=page&redirect_uri=${window.location.href}&response_type=token&scope=photos`;
}
