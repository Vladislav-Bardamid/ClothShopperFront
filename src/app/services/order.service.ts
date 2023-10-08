import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpService) {}

  controllerName = 'order';

  addOrders(clothes: number[]) {
    return this.http.post(this.controllerName, clothes);
  }

  removeOrders(clothes: number[]) {
    return this.http.delete(this.controllerName, clothes);
  }

  removeAllOrders() {
    var url = `${this.controllerName}/all`;

    return this.http.delete(url);
  }
}
