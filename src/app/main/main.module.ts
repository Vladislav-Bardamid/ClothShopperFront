import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from '../main/main.component';
import { CommonComponent } from './common/common.component';
import { ContentComponent } from './content/content.component';
import { MainRoutingModule } from './main-routing.module';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { ControlsModule } from '../controls/controls.module';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    MainComponent,
    CommonComponent,
    ContentComponent,
    NotFoundComponent,
    SidebarItemComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    OverlayscrollbarsModule,
  ],
  providers: [],
})
export class MainModule {}
