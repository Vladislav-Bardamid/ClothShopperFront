import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { ClothCardComponent } from './catalog/cloth-card/cloth-card.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/httpService';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthComponent } from './auth/auth.component';

var appModules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  MatSelectModule,
];

var matModules = [
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ClothCardComponent,
    CatalogComponent,
    AuthComponent,
  ],
  imports: [appModules, matModules],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
