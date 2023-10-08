import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClothModel } from '../models/cloth.model';

@Injectable({ providedIn: 'root' })
export class CommonService {
  showSpinner = new Subject<boolean>();

  changeTitle = new Subject<string>();

  showLeftSideNav = new Subject<void>();
  showRightSideNav = new Subject<void>();

  collapseSidebar = new Subject<void>();

  setPriceCount = new Subject<number>();
  createOrder = new Subject<ClothModel>();
  removeOrder = new Subject<ClothModel>();
  clearOrders = new Subject<void>();

  openFullPreview = new Subject<string>();
  closeFullPreview = new Subject<void>();

  routerParamsChanged = new Subject<void>();
  routerFragmentChanged = new Subject<void>();

  onLogined = new Subject<void>();
  isLogined = false;

  onScroll = new Subject<void>();
  beforeUnload = new Subject<void>();

  constructor() {
    window.onscroll = () => this.onScroll.next();
    window.onbeforeunload = () => this.beforeUnload.next();
  }
}
