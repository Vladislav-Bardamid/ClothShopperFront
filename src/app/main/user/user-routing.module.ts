import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
    children: [
      {
        path: '',
        redirectTo: 'current',
        pathMatch: 'full',
      },
      {
        path: 'current',
        title: 'Мой профиль',
      },
      {
        path: 'new',
        title: 'Новый профиль',
      },
      {
        path: 'all',
        title: 'Профили',
      },
      {
        path: ':userId',
        title: 'Профиль пользователя',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
