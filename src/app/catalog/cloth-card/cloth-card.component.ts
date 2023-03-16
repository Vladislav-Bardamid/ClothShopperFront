import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cloth } from 'src/app/types/cloth';

@Component({
  selector: 'app-cloth-card',
  templateUrl: './cloth-card.component.html',
  styleUrls: ['./cloth-card.component.scss'],
})
export class ClothCardComponent implements OnInit {
  @Input() type = 0;
  @Input() item = new Cloth();

  itemFullDescription = () =>
    `${this.item.title} ${this.item.width} / ${this.item.height} : ${this.item.price}`;

  constructor() {}
  ngOnInit() {}

  @Output() onChanged = new EventEmitter<boolean>();

  change(increased: any) {
    this.onChanged.emit(increased);
  }
}
