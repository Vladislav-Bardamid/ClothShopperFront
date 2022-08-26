import { Component, OnInit } from '@angular/core';
import { Cloth } from './cloth';
import { HttpService } from './services/httpService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ClothShopperFront';
  value = '';
  minPrice = 0;
  maxPrice = 0;
  items: Cloth[] = [];

  constructor(private httpService: HttpService) {}
  ngOnInit() {
    this.httpService.getClothList().subscribe((data) => {
      this.items = data;
    });
  }
  onChanged() {}
}
