import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  computed,
  signal,
} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  title = environment.title;

  hidden = false;

  clientId = environment.clientId;
  href = window.location.href;

  selectedMenuId?: number;

  albumList = signal<MenuItem[]>([]);

  menuItems = computed<MenuItem[]>(() => [
    {
      title: 'Информация',
      link: '/',
      icon: 'home',
    },
    {
      title: 'Альбомы',
      link: '/albums',
      icon: 'photo_library',
      children: this.albumList(),
    },
    {
      title: 'Заказы',
      link: '/orders',
      icon: 'shopping_cart',
      children: [
        {
          title: 'Новый',
          link: 'new',
          icon: 'add_circle_outline',
        },
        {
          title: 'История',
          link: 'history',
          icon: 'history',
        },
      ],
    },
    {
      title: 'Пользовователи',
      link: '/users',
      icon: 'group',
      children: [
        {
          title: 'Мой профиль',
          link: 'current',
          icon: 'manage_accounts',
        },
        {
          title: 'Все',
          link: 'all',
          icon: 'group',
        },
        {
          title: 'Создать',
          link: 'new',
          icon: 'person_add',
        },
      ],
    },
  ]);

  constructor(
    private albumService: AlbumService,
    private commonService: CommonService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums() {
    this.albumService.getAlbums().subscribe((albums) => {
      this.albumList.set(
        albums.map((album) => ({
          title: album.title,
          link: String(album.id),
          icon: 'radio_button_checked',
        }))
      );
    });
  }
}

export interface MenuItem {
  title: string;
  link: string;
  icon: string;
  children?: MenuItem[];
}
