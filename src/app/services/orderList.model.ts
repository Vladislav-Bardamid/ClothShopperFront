import { Order } from '../models/order.model';

export interface OrderList {
  id: number;
  commitDate: Date;
  orders: Order[];
}
