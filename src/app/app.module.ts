import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { Router, TitleStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { CommonService } from './services/common.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TemplatePageTitleStrategy } from './titleStrategy';
import { ControlsModule } from './controls/controls.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

var jwtModule = JwtModule.forRoot({
  config: {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    allowedDomains: [environment.apiUrl],
    disallowedRoutes: [`${environment.apiUrl}/login`],
  },
});

var serviceWorkers = ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000',
});

// if (isDevMode()) {
//   navigator.serviceWorker.getRegistrations().then((registrations) => {
//     for (const registration of registrations) {
//       registration.unregister();
//     }
//   });
// }

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    jwtModule,
    serviceWorkers,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    OverlayscrollbarsModule
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router, private commonService: CommonService) {
    this.initAuthenfication();
  }

  initAuthenfication() {
    if (localStorage.getItem('access_token')) {
      return;
    }

    this.router.navigate(['login']);
  }
}
