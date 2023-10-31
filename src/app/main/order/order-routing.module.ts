import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const orderRoutes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
  {
    path: 'new',
    component: OrderListComponent,
    title: 'Новый заказ',
  },
  {
    path: 'history',
    component: OrderHistoryComponent,
    title: 'История заказов',
  },
  {
    path: ':orderId',
    component: OrderListComponent,
    title: 'Заказы',
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
