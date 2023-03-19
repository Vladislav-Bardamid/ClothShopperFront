import { NgModule, isDevMode } from '@angular/core';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClothCardComponent } from './catalog/cloth-card/cloth-card.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/httpService';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthComponent } from './auth/auth.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SimpleDialogComponent } from './dialogs/simple-dialog/simple-dialog.component';
import { Dialogs } from './dialogs/dialogs';
import { CatalogFilterComponent } from './catalog/catalog-filter/catalog-filter.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './catalog/not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';

var appModules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
];

var matModules = [
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatTooltipModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ClothCardComponent,
    CatalogComponent,
    AuthComponent,
    SimpleDialogComponent,
    CatalogFilterComponent,
    HeaderComponent,
    NotFoundComponent,
    FooterComponent,
  ],
  imports: [
    appModules,
    matModules,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
  ],
  providers: [HttpService, Dialogs],
  bootstrap: [AppComponent],
})
export class AppModule {}
