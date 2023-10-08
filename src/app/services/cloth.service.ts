import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpService } from './http.service';
import { ClothesFilterModel } from '../models/filter.model';
import { ClothListModel } from '../models/clothList.model';

@Injectable({ providedIn: 'root' })
export class ClothService {
  constructor(private http: HttpService) {}

  controllerName = 'cloth';

  getPhotos(albumId = 0, filter?: ClothesFilterModel) {
    var params = new HttpParams().append('albumId', albumId.toString());

    if (filter) {
      params = params
        .append('text', filter.text ?? '')
        .append('minPrice', filter.minPrice ?? '')
        .append('maxPrice', filter.maxPrice ?? '')
        .append('sortType', filter.sortType ?? '');
    }

    return this.http.get<ClothListModel>(this.controllerName, { params });
  }
}
