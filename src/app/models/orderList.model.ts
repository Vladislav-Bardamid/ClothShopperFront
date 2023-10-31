import { Order } from './order.model';

export interface OrderList {
  id: number;
  commitDate: string;
  orders: Order[];
  priceSum: number;
}
