import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cloth } from '../types/cloth';

@Injectable({ providedIn: 'root' })
export class VkAuthService {
  baseUrl = 'https://oauth.vk.com/authorize?';
  clientId = 723672859769823576;
  constructor(private httpClient: HttpClient) {}
  getClothList() {
    return this.httpClient.get<Cloth[]>(`${this.baseUrl}?client_id=${this.clientId}&display=page&redirect_uri=${window.location.href}&response_type=code`);
  }
}
