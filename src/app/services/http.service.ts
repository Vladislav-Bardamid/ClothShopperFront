import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DialogService } from './dialog.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(
    protected httpClient: HttpClient,
    protected dialogs: DialogService,
    protected router: Router
  ) {}
  public get<T>(link: string, options: Partial<HttpOptions> = {}) {
    var url = `${environment.apiUrl}/${link}`;

    this.assignDefaultOptions(options);

    var headers = this.createAuthorizationHeader<T>(options);

    return this.httpClient
      .get<T>(url, { params: options?.params, headers })
      .pipe(
        catchError((x) => {
          this.resolveError(x);
          throw x;
        })
      );
  }

  public post<T>(link: string, body?: any, options: Partial<HttpOptions> = {}) {
    var url = `${environment.apiUrl}/${link}`;

    this.assignDefaultOptions(options);

    var headers = this.createAuthorizationHeader<T>(options);

    return this.httpClient
      .post<T>(url, body, { params: options?.params, headers })
      .pipe(
        catchError((x) => {
          this.resolveError(x);
          throw x;
        })
      );
  }

  public put<T>(link: string, body?: any, options: Partial<HttpOptions> = {}) {
    var url = `${environment.apiUrl}/${link}`;

    this.assignDefaultOptions(options);

    var headers = this.createAuthorizationHeader<T>(options);

    return this.httpClient
      .put<T>(url, body, { params: options?.params, headers })
      .pipe(
        catchError((x) => {
          this.resolveError(x);
          throw x;
        })
      );
  }

  public delete<T>(
    link: string,
    body?: any,
    options: Partial<HttpOptions> = {}
  ) {
    var url = `${environment.apiUrl}/${link}`;

    this.assignDefaultOptions(options);

    var headers = this.createAuthorizationHeader<T>(options);

    return this.httpClient
      .delete<T>(url, { body: body, params: options?.params, headers })
      .pipe(
        catchError((x) => {
          this.resolveError(x);
          throw x;
        })
      );
  }

  private resolveError(result: any) {
    if (result.status == 401) {
      this.router.navigate(['login']);
      return;
    }

    alert(`${result.message}\r\n${result.error}`);
  }

  private getToken() {
    var token = localStorage.getItem('access_token');

    if (!token) {
      this.router.navigate(['login']);
      return null;
    }

    return token;
  }

  private createAuthorizationHeader<T>(options: Partial<HttpOptions>) {
    var headers = new HttpHeaders();

    if (options?.isAuthorized) {
      var token = this.getToken();
      if (token) {
        headers = headers.append('Authorization', 'Bearer ' + token);
      }
    }
    return headers;
  }

  assignDefaultOptions(options: Partial<HttpOptions>) {
    Object.assign(options, { isAuthorized: true });
  }
}

interface HttpOptions {
  isAuthorized: boolean;
  params: HttpParams;
}
