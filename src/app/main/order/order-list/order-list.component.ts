import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderList } from 'src/app/models/orderList.model';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderDate?: string;
  orderList?: OrderList;

  currency = environment.currency;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadOrderList();

    this.orderService.orderListChanging.subscribe(() => {
      this.loadOrderList(true);
    });
  }

  loadOrderList(refresh = false) {
    this.orderService.getOrderList(refresh).subscribe((orderList) => {
      this.orderList = orderList;
      this.orderDate = this.dateToISOString(orderList.commitDate);

      this.setCommitDateTimeout(orderList.commitDate);
    });
  }

  private setCommitDateTimeout(commitDate: string) {
    const timeout = new Date(commitDate).getTime() - new Date().getTime();

    setTimeout(() => {
      this.orderService.getCommitDate().subscribe((date) => {
        this.orderDate = this.dateToISOString(date);
      });
    }, timeout);
  }

  dateToISOString(date: string) {
    return new Date(date).toISOString().slice(0, 16);
  }

  deleteOrder(order: Order) {
    this.orderService.removeOrder(order.id).subscribe(() => {
      this.orderList!.orders = this.orderList!.orders.filter(
        (x) => x.id !== order.id
      );
      this.orderList!.priceSum -= order.price;
      this.orderService.changeOrderPriceSum.next(-order.price);
    });
  }
}
