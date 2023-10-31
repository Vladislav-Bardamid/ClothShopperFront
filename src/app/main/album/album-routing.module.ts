import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album.component';

export const albumRoutes: Routes = [
  {
    path: ':albumId',
    component: AlbumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
