import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from '../main/main.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Информация',
      },
      {
        path: 'albums/:albumId',
        component: AlbumComponent,
      },
      {
        path: 'orders',
        children: [
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
        ],
      },
      {
        path: 'users',
        title: 'Пользователи',
        children: [
          {
            path: '',
            redirectTo: 'current',
            pathMatch: 'full',
          },
          {
            path: 'current',
            component: OrderListComponent,
            title: 'Мой профиль',
          },
          {
            path: 'new',
            component: OrderListComponent,
            title: 'Новый профиль',
          },
          {
            path: 'all',
            component: OrderListComponent,
            title: 'Профили',
          },
          {
            path: ':userId',
            component: OrderListComponent,
            title: 'Профиль пользователя',
          },
        ],
      },
      {
        path: '**',
        title: 'Страница не найдена',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
