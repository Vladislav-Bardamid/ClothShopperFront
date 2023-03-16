import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClothesFilterModel } from 'src/app/types/filterModel';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
})
export class CatalogFilterComponent implements OnInit {
  value = '';
  minPrice = 0;
  maxPrice = 0;
  sorting = 0;

  timeout: any;

  filterForm = new FormGroup({
    text: new FormControl(''),
    minPrice: new FormControl(0),
    maxPrice: new FormControl(0),
    sortType: new FormControl(0),
  });

  lastValues!: ClothesFilterModel;

  constructor() {}

  ngOnInit(): void {
    this.lastValues = this.filterForm.value as ClothesFilterModel;

    this.filterForm.valueChanges.subscribe((value) => {
      let model = value as ClothesFilterModel;

      let hasChange = this.checkFilterChanges(model);
      if (!hasChange) {
        this.resetLoading();
        return;
      }

      this.updateFilterAfterTimer(model);
    });
  }

  checkFilterChanges(value: ClothesFilterModel) {
    return Object.keys(value).some(
      (key) =>
        value[key as keyof ClothesFilterModel] !=
        this.lastValues[key as keyof ClothesFilterModel]
    );
  }

  resetLoading(){
    clearTimeout(this.timeout);
  }

  updateFilterAfterTimer(value: ClothesFilterModel) {
    if (this.timeout) {
      this.resetLoading()
    }

    this.timeout = setTimeout(() => {
      this.onFilterUpdate.emit(value);
      this.lastValues = this.filterForm.value as ClothesFilterModel;
    }, 1000);
  }

  resetFilters() {
    this.filterForm.controls.text.setValue('');
    this.filterForm.controls.maxPrice.setValue(0);
    this.filterForm.controls.minPrice.setValue(0);
  }

  _type = 0;

  @Input()
  set type(value: number) {
    this._type = value;
    this.typeChange.emit(value);
  }

  @Output()
  typeChange = new EventEmitter<number>();

  @Output()
  onClear = new EventEmitter();

  @Output()
  onFilterUpdate = new EventEmitter<ClothesFilterModel>();
}
