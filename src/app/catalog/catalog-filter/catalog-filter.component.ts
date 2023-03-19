import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  interval,
  timer,
  Subject,
} from 'rxjs';
import {
  takeUntil,
  finalize,
  skip,
  switchMap,
} from 'rxjs/operators';
import { ClothesFilterModel } from 'src/app/models/filterModel';

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

  _type = 0;

  filterTimer = 0;
  timeout: any;

  filterForm = new FormGroup({
    text: new FormControl(''),
    minPrice: new FormControl(0),
    maxPrice: new FormControl(0),
    sortType: new FormControl(0),
  });

  lastValues!: ClothesFilterModel;

  interval$ = new Subject<void>();
  interval = 1500;

  @Input() filter!: ClothesFilterModel;

  constructor() {}

  ngOnInit(): void {
    this.initFilters();
    this.initFiltersSpinner();
    this.initFiltersChanging();
  }

  initFilters() {
    if (!this.filter) return;

    this.lastValues = this.filter;
    this.filterForm.setValue(this.filter);
  }

  initFiltersSpinner() {
    this.interval$
      .pipe(
        switchMap(() =>
          interval(10).pipe(
            skip(1),
            takeUntil(timer(this.interval)),
            finalize(() => (this.filterTimer = 0))
          )
        )
      )
      .subscribe((value) => {
        this.filterTimer = value;
      });
  }

  initFiltersChanging() {
    this.filterForm.valueChanges.subscribe((value) => {
      let model = value as ClothesFilterModel;

      let hasChange = this.checkFilterChanges(model);
      if (!hasChange) {
        this.resetLoading();
        return;
      }

      this.interval$.next();

      if (this.timeout) {
        this.resetLoading();
      }

      this.timeout = setTimeout(() => {
        this.filterChange.emit(model);
        this.lastValues = this.filterForm.value as ClothesFilterModel;
      }, this.interval);
    });
  }

  resetLoading() {
    clearTimeout(this.timeout);
  }

  checkFilterChanges(value: ClothesFilterModel) {
    return !this.areObjectsEqual(value, this.lastValues);
  }

  areObjectsEqual(obj1: any, obj2: any) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    for (let key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (obj1[key] != obj2[key]) return false;
      }
    }

    return true;
  }

  resetFilters() {
    this.filterForm.controls.text.setValue('');
    this.filterForm.controls.maxPrice.setValue(0);
    this.filterForm.controls.minPrice.setValue(0);
  }

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
  filterChange = new EventEmitter<ClothesFilterModel>();
}
