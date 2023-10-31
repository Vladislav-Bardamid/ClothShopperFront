import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Order } from '../models/order.model';
import {
  Observable,
  shareReplay,
  BehaviorSubject,
  tap,
  switchMap,
  filter,
  Subject,
} from 'rxjs';
import { OrderList } from '../models/orderList.model';
import { skip } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpService) {}

  controllerName = 'order';

  private orderList$?: Observable<OrderList>;

  orderListChanging = new Subject<void>();

  changeOrderPriceSum = new Subject<number>();
  clearOrders = new Subject<void>();

  getOrderList(refresh = false) {
    if (refresh == true) {
      delete this.orderList$;
    }

    return (this.orderList$ ??= this.http
      .get<OrderList>(this.controllerName)
      .pipe(shareReplay(1)));
  }

  getCommitDate() {
    return this.http.get<string>(this.controllerName + '/commitDate');
  }

  changeOrders(command: OrderListCommand) {
    return this.http.post(this.controllerName, command).pipe(
      tap(() => {
        this.orderListChanging!.next();
      })
    );
  }

  removeOrder(id: number) {
    return this.http.delete(`${this.controllerName}/${id}`);
  }

  removeAllAlbumOrders(albumId: number) {
    var url = `${this.controllerName}/album/${albumId}`;

    return this.http.delete(url);
  }

  removeAllOrders() {
    var url = `${this.controllerName}/all`;

    return this.http.delete(url);
  }
}

interface OrderListCommand {
  add: number[];
  delete: number[];
}
