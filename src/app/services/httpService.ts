import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cloth } from '../types/cloth';
import { Response } from '../types/response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(protected httpClient: HttpClient) {}
  protected get<T>(link: string) {
    return this.httpClient.get<Response<T>>(environment.apiUrl + link);
  }

  protected post<T>(link: string, body: any) {
    return this.httpClient.post<Response<T>>(environment.apiUrl + link, body);
  }
}
