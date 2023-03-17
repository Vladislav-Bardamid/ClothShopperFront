import { Component, Input, OnInit, Output } from '@angular/core';
import { ClothService } from '../services/clothService';
import { Cloth } from '../types/cloth';
import { Dialogs } from '../dialogs/dialogs';
import { ClothesFilterModel } from '../types/filterModel';
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

  constructor(
    private clothService: ClothService,
    private dialogs: Dialogs,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.type = Number(localStorage.getItem('type') ?? 0);
    this.update();
  }

  typeChange() {
    localStorage.setItem('type', String(this.type));
  }

  clear() {
    this.items.forEach((element) => {
      element.active = false;
    });
  }

  update(value?: ClothesFilterModel) {
    this.commonService.showSpinner.next(true);

    this.clothService.getPhotos(value).subscribe((response) => {
      if (response.error) {
        this.dialogs.openErrorDialog(response.error);
        return;
      }

      if (response.data) {
        this.items = response.data;
      }

      this.init = true;

      this.commonService.showSpinner.next(false);
    });
  }
}
