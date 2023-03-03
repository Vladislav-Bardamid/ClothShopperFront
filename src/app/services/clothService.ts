import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cloth } from '../types/cloth';
import { environment } from 'src/environments/environment';
import { HttpService } from './httpService';

@Injectable({ providedIn: 'root' })
export class ClothService extends HttpService {
  getPhotos() {
    return this.get<Cloth[]>('/Clothes/GetClothes');
  }
}
