import { Component, Input, OnInit, Output } from '@angular/core';
import { ClothService } from '../services/clothService';
import { Cloth } from '../types/cloth';
import { Dialogs } from '../dialogs/dialogs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  type = 0;
  sorting = 0;
  items: Cloth[] = [];

  constructor(private clothService: ClothService, private dialogs: Dialogs) {}

  ngOnInit() {
    this.type = Number(localStorage.getItem('type') ?? 0);
    this.update();
  }

  onChanged() {}

  clear() {
    this.items.forEach((element) => {
      element.active = false;
    });
  }

  update() {
    this.clothService.getPhotos().subscribe((response) => {
      if (response.error) {
        this.dialogs.openErrorDialog(response.error);
        return;
      }

      this.items = response.data;
    });
  }
}
