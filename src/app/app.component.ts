import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Cloth } from './cloth';
import { HttpService } from './services/httpService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ClothShopperFront';
  value = '';
  minPrice = 0;
  maxPrice = 0;
  type = 0;
  items: Cloth[] = [];
  hideScrollButton = true;

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

  @HostListener('window:scroll', ['$event']) doSomething() {
    this.hideScrollButton = window.scrollY < 1000;
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
