import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ClothModel } from 'src/app/models/cloth.model';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-cloth-card',
  templateUrl: './cloth-card.component.html',
  styleUrls: ['./cloth-card.component.css'],
})
export class ClothCardComponent implements OnInit, OnChanges {
  @Input() type = 0;
  @Input() item!: ClothModel;

  @ViewChild('title') titleElement!: ElementRef;

  isTitleOverflow = false;
  showZoomButton = false;
  errorImageLoading = false;

  currency = environment.currency;

  constructor(private commonService: CommonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'].currentValue == changes['type'].previousValue) return;

    this.checkIsTitleOverflow();
  }

  ngOnInit() {
    this.checkIsTitleOverflow();
  }

  onImageContainerMouseOver() {
    this.showZoomButton = true;
  }

  onImageContainerMouseLeave() {
    this.showZoomButton = false;
  }

  onZoomMouseOver() {
    this.commonService.openFullPreview.next(this.item.urlLg);
  }

  onZoomMouseLeave() {
    this.commonService.closeFullPreview.next();
  }

  checkIsTitleOverflow() {
    setTimeout(() => {
      this.isTitleOverflow =
        this.titleElement.nativeElement.scrollWidth >
        this.titleElement.nativeElement.clientWidth;
    });
  }

  setActive() {
    this.item.isActive = !this.item.isActive;
    if (this.item.isActive) {
      this.commonService.createOrder.next(this.item);
    } else {
      this.commonService.removeOrder.next(this.item);
    }
  }

  onImageError(imageRef: HTMLImageElement) {
    this.errorImageLoading = true;
    imageRef.setAttribute('hidden', '');
    // imageRef.src = '/assets/images/sticker.png';
  }
}
