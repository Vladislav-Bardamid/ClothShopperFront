import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbumModel } from 'src/app/models/album.model';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('heightState', [
      state('true', style({ height: '*', opacity: 1 })),
      state('false', style({ height: '0', opacity: 0 })),
      transition('false => true', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition('true => false', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-out', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Output() onSelectAlbum = new EventEmitter<void>();

  title = environment.title;

  clientId = environment.clientId;
  href = window.location.href;

  selectedMenuId?: number;

  albumList: AlbumModel[] = [];

  menuItems: MenuItem[] = [
    {
      title: 'Информация',
      link: '/',
      icon: 'home',
    },
    {
      title: 'Альбомы',
      link: '/albums',
      icon: 'photo_library',
      children: [],
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
  ];

  constructor(
    private albumService: AlbumService,
    private commonService: CommonService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.onLogined.subscribe(() => {
      this.loadAlbums();
    });

    if (!this.commonService.isLogined) return;

    this.loadAlbums();
  }

  loadAlbums() {
    this.albumService.getAlbums().subscribe((albums) => {
      this.albumList = albums;

      this.menuItems[1].children = albums.map((album) => ({
        title: album.title,
        link: String(album.id),
        icon: 'radio_button_checked',
      }));
    });
  }
}

interface MenuItem {
  title: string;
  link: string;
  icon: string;
  children?: MenuItem[];
}
