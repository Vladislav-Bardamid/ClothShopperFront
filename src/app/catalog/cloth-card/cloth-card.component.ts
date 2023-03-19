import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cloth } from 'src/app/models/cloth';
import { CommonService } from 'src/app/services/commonService';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cloth-card',
  templateUrl: './cloth-card.component.html',
  styleUrls: ['./cloth-card.component.scss'],
})
export class ClothCardComponent implements OnInit {
  @Input() type = 0;
  @Input() item = new Cloth();

  currency = environment.currency;

  constructor(private commonService: CommonService) {}
  ngOnInit() {}

  setActive() {
    this.item.active = !this.item.active;
    if (this.item.active) {
      this.commonService.updatePriceCount.next(this.item.price);
    } else {
      this.commonService.updatePriceCount.next(-this.item.price);
    }
  }
}
