import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  priceCount = 0;

  currency = environment.currency;

  showLeftSideNav = false;
  showRightSideNav = false;

  isLogined = this.commonService.isLogined;

  constructor(
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.setPriceCount.subscribe((sum) => {
      this.priceCount = sum;
    });

    this.commonService.createOrder.subscribe((cloth) => {
      this.priceCount += cloth.price;
    });

    this.commonService.removeOrder.subscribe((cloth) => {
      this.priceCount -= cloth.price;
    });

    this.commonService.clearOrders.subscribe((cloth) => {
      this.priceCount = 0;
    });

    this.commonService.onLogined.subscribe(() => {
      this.isLogined = true;
    });
  }

  collapseSidebar() {
    this.commonService.collapseSidebar.next();
  }
}
