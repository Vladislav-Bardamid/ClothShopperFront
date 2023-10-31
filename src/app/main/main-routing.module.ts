import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from '../main/main.component';
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
        path: 'albums',
        loadChildren: () =>
          import('./album/album.module').then((m) => m.AlbumModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
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
