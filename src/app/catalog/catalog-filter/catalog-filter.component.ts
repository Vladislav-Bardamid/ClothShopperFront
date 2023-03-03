import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
})
export class CatalogFilterComponent {
  value = '';
  minPrice = 0;
  maxPrice = 0;
  type = 0;
  sorting = 0;

  onChanged() {}

  @Output()
  onFilterClear = new EventEmitter<string>();

  @Output()
  onFilterUpdate = new EventEmitter<string>();

  onTypeChanged() {
    localStorage.setItem('type', String(this.type));
  }
}
