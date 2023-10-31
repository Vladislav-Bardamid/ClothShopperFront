import { NgModule } from '@angular/core';
import { AlbumFilterComponent } from './album-filter/album-filter.component';
import { AlbumLoadingErrorComponent } from './album-loading-error/album-loading-error.component';
import { AlbumComponent } from './album.component';
import { ClothCardComponent } from './cloth-card/cloth-card.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from 'src/app/controls/controls.module';
import { AlbumRoutingModule } from './album-routing.module';

@NgModule({
  imports: [CommonModule, AlbumRoutingModule, ReactiveFormsModule, ControlsModule],
  exports: [],
  declarations: [
    ClothCardComponent,
    AlbumComponent,
    AlbumFilterComponent,
    AlbumLoadingErrorComponent,
  ],
  providers: [],
})
export class AlbumModule {}
