import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpService } from './http.service';
import { AlbumModel } from '../models/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  constructor(private http: HttpService) {}

  private controllerName = 'album';

  private albums$?: Observable<AlbumModel[]>;

  getAlbums() {
    if (this.albums$ != null) return this.albums$;

    this.albums$ = this.http
      .get<AlbumModel[]>(this.controllerName)
      .pipe(shareReplay(1));

    return this.albums$;
  }

  getAlbum(id: number) {
    return this.getAlbums().pipe(
      map((albums) => albums.find((album) => album.id == id))
    );
  }
}
