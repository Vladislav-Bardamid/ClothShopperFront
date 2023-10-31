import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  priceSum = 0;

  currency = environment.currency;

  showLeftSideNav = false;
  showRightSideNav = false;

  constructor(
    private commonService: CommonService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrdersPriceSum();

    this.orderService.changeOrderPriceSum.subscribe((price) => {
      this.priceSum += price;
    });

    this.orderService.clearOrders.subscribe(() => {
      this.loadOrdersPriceSum();
    });
  }

  loadOrdersPriceSum() {
    this.orderService.getOrderList().subscribe((orderList) => {
      this.priceSum = orderList.priceSum;
    })
  }

  collapseSidebar() {
    this.commonService.collapseSidebar.next();
  }
}
