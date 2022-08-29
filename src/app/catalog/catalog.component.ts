import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService';
import { Cloth } from '../types/cloth';
import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CatalogComponent implements OnInit {
  title = 'ClothShopperFront';
  value = '';
  minPrice = 0;
  maxPrice = 0;
  type = 0;
  sorting = 0;
  items: Cloth[] = [];

  constructor(private httpService: HttpService) {}
  ngOnInit() {
    this.type = Number(localStorage.getItem('type') ?? 0);
    this.httpService.getClothList().subscribe((data) => {
      this.items = data;
    });
  }
  onChanged() {}
  onTypeChanged() {
    localStorage.setItem('type', String(this.type));
  }

  onClear() {
    this.items.forEach((element) => {
      element.active = false;
    });
  }
}
