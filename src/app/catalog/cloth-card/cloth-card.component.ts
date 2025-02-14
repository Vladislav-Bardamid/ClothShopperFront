import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cloth } from 'src/app/types/cloth';

@Component({
  selector: 'app-cloth-card',
  templateUrl: './cloth-card.component.html',
  styleUrls: ['./cloth-card.component.scss'],
})
export class ClothCardComponent implements OnInit {
  @Input() isFake = 0;
  @Input() type = 0;
  @Input() item : Cloth = {
    title:"",
    active:false,
    height:0,
    price:0,
    width:0
  };

  constructor() {}
  ngOnInit() {}

  @Output() onChanged = new EventEmitter<boolean>();

  change(increased: any) {
    this.onChanged.emit(increased);
  }
}
