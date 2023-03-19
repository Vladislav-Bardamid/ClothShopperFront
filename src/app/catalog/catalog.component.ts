import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { ClothService } from '../services/clothService';
import { Cloth } from '../models/cloth';
import { Dialogs } from '../dialogs/dialogs';
import { ClothesFilterModel } from '../models/filterModel';
import { CommonService } from '../services/commonService';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  init = false;

  type = 0;
  sorting = 0;
  items: Cloth[] = [];
  filter = new ClothesFilterModel();

  lsActiveName = 'activeItemsIds';
  lsFilterName = 'filter';

  constructor(
    private clothService: ClothService,
    private dialogs: Dialogs,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.type = Number(localStorage.getItem('type') ?? 0);
    this.loadFilter();
    this.update();
  }

  typeChange() {
    localStorage.setItem('type', String(this.type));
  }

  clear() {
    this.items.forEach((element) => {
      element.active = false;
    });
    this.estimateAndUpdatePrice();
  }

  onFilterUpdate(value: ClothesFilterModel) {
    this.filter = value;
    this.update();
  }

  update() {
    this.commonService.showSpinner.next(true);

    this.clothService.getPhotos(this.filter).subscribe((response) => {
      if (response.error) {
        this.dialogs.openErrorDialog(response.error);
        return;
      }

      if (response.data) {
        this.items = response.data;
      }

      this.init = true;

      this.commonService.showSpinner.next(false);

      this.loadActiveStates();

      this.estimateAndUpdatePrice();
    });
  }

  estimateAndUpdatePrice() {
    var price = this.items
      .filter((x) => x.active)
      .map((x) => x.price)
      .reduce((previous, current) => previous + current, 0);
    this.commonService.setPriceCount.next(price);
  }

  loadFilter() {
    var filterString = localStorage.getItem(this.lsFilterName);

    if (filterString == null) return;

    this.filter = JSON.parse(filterString) as ClothesFilterModel;
  }

  saveFilter() {
    localStorage.setItem(this.lsFilterName, JSON.stringify(this.filter));
  }

  loadActiveStates() {
    var idsString = localStorage.getItem(this.lsActiveName);

    if (idsString == null) return;

    JSON.parse(idsString).forEach((x: number) => {
      this.items.find((y) => y.id == x)!.active = true;
    });
  }

  saveActiveIds() {
    const activeItemsIds = this.items.filter((x) => x.active).map((x) => x.id);
    localStorage.setItem(this.lsActiveName, JSON.stringify(activeItemsIds));
  }

  @HostListener('window:beforeunload')
  beforeUnloadHandler() {
    this.saveActiveIds();
    this.saveFilter();
  }
}
