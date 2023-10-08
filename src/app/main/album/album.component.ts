import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ClothModel } from 'src/app/models/cloth.model';
import { ClothesFilterModel } from 'src/app/models/filter.model';
import { AlbumService } from 'src/app/services/album.service';
import { ClothService } from 'src/app/services/cloth.service';
import { OrderService } from 'src/app/services/order.service';
import { CommonService } from 'src/app/services/common.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-main-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(50, [animate('600ms ease-out', style({ opacity: 1 }))]),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AlbumComponent implements OnInit {
  init = false;
  loading = false;

  albumId = 0;

  sorting = 0;

  pulseUpdate = false;

  items: ClothModel[] = [];

  type = 0;

  errorMessage = '';

  previewSrc = '';

  filter?: ClothesFilterModel;

  lsActiveName = 'activeItemsIds';
  lsFilterName = 'filter';

  timeout: any;
  interval = 5000;

  selectedIds: number[] = [];
  unSelectedIds: number[] = [];

  @ViewChild('fullPreviewImage') previewImage!: ElementRef;

  constructor(
    private clothService: ClothService,
    private orderService: OrderService,
    private albumService: AlbumService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.type = Number(localStorage.getItem('type') ?? 0);
    this.loadFilter();

    this.route.params.subscribe((params) => {
      this.albumId = params['albumId'];

      this.albumService.getAlbum(this.albumId).subscribe((album) => {
        if (!album) return;

        this.commonService.changeTitle.next(album.title);
      });

      if (this.albumId) {
        this.update();
        return;
      }

      this.albumService.getAlbums().subscribe((response) => {
        this.router.navigate(['/catalog', response[0].id]);
      });
    });

    this.commonService.beforeUnload.subscribe(() => this.beforeUnloadHandler());

    this.commonService.createOrder.subscribe((value) => {
      var isUnSelected = this.unSelectedIds.includes(value.id);

      if (isUnSelected) {
        var index = this.unSelectedIds.indexOf(value.id);
        this.unSelectedIds.splice(index, 1);
      } else {
        this.selectedIds.push(value.id);
      }

      this.initSendOrders();
    });

    this.commonService.removeOrder.subscribe((value) => {
      var isSelected = this.selectedIds.includes(value.id);

      if (isSelected) {
        var index = this.selectedIds.indexOf(value.id);
        this.selectedIds.splice(index, 1);
      } else {
        this.unSelectedIds.push(value.id);
      }

      this.initSendOrders();
    });

    this.commonService.openFullPreview.subscribe((value) => {
      this.previewSrc = value;
    });

    this.commonService.closeFullPreview.subscribe(() => {
      this.previewSrc = '';
    });
  }

  initSendOrders() {
    clearTimeout(this.timeout);

    if (this.selectedIds.length == 0 && this.unSelectedIds.length == 0) return;

    this.timeout = setTimeout(() => {
      this.addOrders();
      this.removeOrders();
    }, this.interval);
  }

  addOrders() {
    if (this.selectedIds.length == 0) return;

    this.orderService.addOrders(this.selectedIds).subscribe(() => {
      this.selectedIds = [];
    });
  }

  removeOrders() {
    if (this.unSelectedIds.length == 0) return;

    this.orderService.removeOrders(this.unSelectedIds).subscribe(() => {
      this.unSelectedIds = [];
    });
  }

  getAlbumIdFromRoute() {
    return Number(this.route.snapshot.paramMap.get('albumId'));
  }

  beforeUnloadHandler() {
    this.saveFilter();
  }

  typeChange(value: number) {
    this.type = value;
    localStorage.setItem('type', this.type.toString());
  }

  clear() {
    this.orderService.removeAllOrders().subscribe(() => {
      this.commonService.clearOrders.next();

      this.items.forEach((item) => {
        item.isActive = false;
      });

      clearInterval(this.interval);

      this.selectedIds = [];
      this.unSelectedIds = [];
    });
  }

  onFilterUpdate(value: ClothesFilterModel) {
    this.filter = Object.assign(this.filter!, value);

    this.update();
  }

  update() {
    if (this.loading) return;

    this.commonService.showSpinner.next(true);
    this.errorMessage = '';
    this.pulseUpdate = false;

    this.loading = true;

    this.clothService
      .getPhotos(this.albumId, this.filter)
      .pipe(
        finalize(() => {
          this.commonService.showSpinner.next(false);
          this.loading = false;
          this.items = [];
        }),
        catchError((error: any) => {
          this.errorMessage =
            'Ошибка загрузки фотографий. Попробуйте повторить попытку позже.';
          this.pulseUpdate = true;

          throw error;
        })
      )
      .subscribe((data) => {
        if (data.items.length > 0) {
          setTimeout(() => (this.items = data.items));

          this.commonService.setPriceCount.next(data.price);
        } else {
          this.errorMessage =
            'Ничего не найдено. Попробуйте изменить пареметры поиска.';
        }

        this.init = true;
      });
  }

  loadFilter() {
    var filterString = localStorage.getItem(this.lsFilterName);

    if (!filterString) return;

    this.filter = JSON.parse(filterString);
  }

  saveFilter() {
    if (!this.filter) return;

    localStorage.setItem(this.lsFilterName, JSON.stringify(this.filter));
  }
}
