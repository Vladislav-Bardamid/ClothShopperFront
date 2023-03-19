import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cloth } from '../models/cloth';
import { environment } from 'src/environments/environment';
import { HttpService } from './httpService';
import { ClothesFilterModel } from '../models/filterModel';

@Injectable({ providedIn: 'root' })
export class ClothService extends HttpService {
  getPhotos(filter?: ClothesFilterModel) {
    return this.post<Cloth[]>('/Clothes/GetClothes', filter);
  }
}
