import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpService } from './http.service';
import { ClothesFilterModel } from '../models/filter.model';
import { ClothListModel } from '../models/clothList.model';
import { shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClothService {
  controllerName = 'cloth';
  
  constructor(private http: HttpService) {}

  getPhotos(albumId = 0, filter?: ClothesFilterModel) {
    var params = new HttpParams().append('albumId', albumId.toString());

    if (filter) {
      params = params
        .append('text', filter.text ?? '')
        .append('minPrice', filter.minPrice ?? '')
        .append('maxPrice', filter.maxPrice ?? '')
        .append('sortType', filter.sortType ?? '');
    }

    return this.http
      .get<ClothListModel>(this.controllerName, { params })
      .pipe(shareReplay(1));
  }
}
