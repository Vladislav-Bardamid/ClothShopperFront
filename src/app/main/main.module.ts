import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClothCardComponent } from './album/cloth-card/cloth-card.component';
import { AlbumComponent } from './album/album.component';
import { AlbumFilterComponent } from './album/album-filter/album-filter.component';
import { HeaderComponent } from './header/header.component';
import { AlbumLoadingErrorComponent } from './album/album-loading-error/album-loading-error.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from '../main/main.component';
import { CommonComponent } from './common/common.component';
import { ContentComponent } from './content/content.component';
import { MainRoutingModule } from './main-routing.module';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    ClothCardComponent,
    AlbumComponent,
    AlbumFilterComponent,
    HeaderComponent,
    AlbumLoadingErrorComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    MainComponent,
    CommonComponent,
    ContentComponent,
    OrderListComponent,
    OrderHistoryComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class MainModule {
  constructor() {}
}
