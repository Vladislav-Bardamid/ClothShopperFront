import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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

function createAnimation(staggerDelay: number) {
  return query(
    ':enter',
    [
      style({ opacity: 0 }),
      stagger(staggerDelay, [animate('600ms ease-out', style({ opacity: 1 }))]),
    ],
    {
      optional: true,
    }
  );
}
@Component({
  selector: 'app-main-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => 50', [createAnimation(50)]),
      transition('* => 20', [createAnimation(20)]),
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
export class AlbumComponent implements OnInit, OnDestroy {
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

  previewTimeout: any;

  selectedIds: number[] = [];
  preSelectedIds: number[] = [];
  unSelectedIds: number[] = [];
  preUnSelectedIds: number[] = [];

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
    this.loadType();

    this.loadFilter();

    this.initPreview();

    this.initUnload();

    this.initAlbumIdChange();
  }

  ngOnDestroy() {
    this.saveAll();
  }

  initUnload() {
    this.commonService.beforeUnload.subscribe(() => this.saveAll());
  }

  initPreview() {
    this.commonService.openFullPreview.subscribe((value) => {
      this.previewTimeout = setTimeout(() => {
        this.previewSrc = value;
      }, 200);
    });

    this.commonService.closeFullPreview.subscribe(() => {
      clearTimeout(this.previewTimeout);
      this.previewSrc = '';
    });
  }

  processCloth(cloth: ClothModel) {
    if (cloth.isActive) {
      this.createOrder(cloth);
      this.orderService.changeOrderPriceSum.next(cloth.price);
    } else {
      this.removeOrder(cloth);
      this.orderService.changeOrderPriceSum.next(-cloth.price);
    }
  }

  createOrder(value: ClothModel) {
    var isUnSelected = this.unSelectedIds.includes(value.id);

    if (isUnSelected) {
      var index = this.unSelectedIds.indexOf(value.id);
      this.unSelectedIds.splice(index, 1);
    } else {
      this.selectedIds.push(value.id);
    }

    this.initSendOrders();
  }

  removeOrder(value: ClothModel) {
    var isSelected = this.selectedIds.includes(value.id);

    if (isSelected) {
      var index = this.selectedIds.indexOf(value.id);
      this.selectedIds.splice(index, 1);
    } else {
      this.unSelectedIds.push(value.id);
    }

    this.initSendOrders();
  }

  initAlbumIdChange() {
    this.route.params.subscribe((params) => {
      this.albumId = params['albumId'];

      this.albumService.getAlbum(this.albumId).subscribe((album) => {
        if (!album) return;

        this.commonService.changeTitle.next(album.title);
      });

      if (this.albumId) {
        this.loadAlbum();
        return;
      }

      this.albumService.getAlbums().subscribe((response) => {
        this.router.navigate(['/catalog', response[0].id]);
      });
    });
  }

  initSendOrders() {
    clearTimeout(this.timeout);

    if (this.selectedIds.length == 0 && this.unSelectedIds.length == 0) return;

    this.timeout = setTimeout(() => this.saveOrders(), this.interval);
  }

  saveOrders() {
    if (this.selectedIds.length == 0 && this.unSelectedIds.length == 0) return;

    const command = {
      add: this.selectedIds,
      delete: this.unSelectedIds,
    };

    this.orderService.changeOrders(command).subscribe(() => {
      this.selectedIds = [];
      this.unSelectedIds = [];
    });
  }

  getAlbumIdFromRoute() {
    return Number(this.route.snapshot.paramMap.get('albumId'));
  }

  saveAll() {
    clearTimeout(this.timeout);

    this.saveOrders();

    this.saveFilter();

    this.saveType();
  }

  typeChange(value: number) {
    if (this.type == value) return;

    this.type = value;

    this.saveType();
  }

  clear() {
    this.orderService.removeAllOrders().subscribe(() => {
      this.orderService.clearOrders.next();

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

    this.loadAlbum();
  }

  loadAlbum() {
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
        }),
        catchError((error: any) => {
          this.errorMessage =
            'Ошибка загрузки фотографий. Попробуйте повторить попытку позже.';
          this.pulseUpdate = true;

          throw error;
        })
      )
      .subscribe((data) => {
        this.items = data.items;

        if (data.items.length == 0) {
          this.errorMessage =
            'Ничего не найдено. Попробуйте изменить пареметры поиска.';
        }

        this.init = true;
      });
  }

  loadType() {
    this.type = Number(localStorage.getItem('type') ?? 0);
  }

  saveType() {
    localStorage.setItem('type', this.type.toString());
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

  identify(index: number, item: ClothModel) {
    return item.id;
  }
}
