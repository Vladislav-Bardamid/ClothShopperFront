export class ClothesFilterModel {
  text!: '';
  minPrice = 0;
  maxPrice = 0;
  sortType: SortType = 0;
}

export enum SortType {
  Date,
  DateDesc,
  Name,
  Price,
  PriceDesc,
}
