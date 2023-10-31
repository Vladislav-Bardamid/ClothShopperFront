import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { interval, timer, Subject } from 'rxjs';
import { takeUntil, finalize, skip, switchMap } from 'rxjs/operators';
import { ClothesFilterModel } from 'src/app/models/filter.model';

@Component({
  selector: 'app-main-album-filter',
  templateUrl: './album-filter.component.html',
  styleUrls: ['./album-filter.component.css'],
})
export class AlbumFilterComponent implements OnInit {
  value = '';
  minPrice = 0;
  maxPrice = 0;
  sorting = 0;

  filterTimer = 0;
  timeout: any;

  filterForm = new FormGroup({
    text: new FormControl(''),
    minPrice: new FormControl(0),
    maxPrice: new FormControl(0),
    sortType: new FormControl(0),
  });

  interval$ = new Subject<void>();
  interval = 1500;

  @Input()
  type = 0;

  @Input()
  filter?: ClothesFilterModel;

  @Input() pulseUpdate = false;
  @Input() disableUpdate = false;

  lsFilterName = 'filter';

  constructor() {}

  ngOnInit(): void {
    this.initFiltersChanging();

    // this.initFiltersSpinner();
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
        this.filter = model;
        this.filterChange.emit(model);
      }, this.interval);
    });
  }

  clearSelectedClothes() {
    this.onClear.emit();
  }

  updateCLothes() {
    this.update.emit();
  }

  resetLoading() {
    clearTimeout(this.timeout);
  }

  checkFilterChanges(value: ClothesFilterModel) {
    return !this.areObjectsEqual(value, this.filter);
  }

  areObjectsEqual(obj1: any, obj2: any) {
    if (!obj1 || !obj2) return false;

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

  setType(value: number) {
    this.type = value;
    this.typeChange.emit(value);
  }

  @Output()
  typeChange = new EventEmitter<number>();

  @Output()
  onClear = new EventEmitter();

  @Output()
  filterChange = new EventEmitter<ClothesFilterModel>();

  @Output()
  update = new EventEmitter();
}
