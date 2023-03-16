export class ClothesFilterModel {
  text: String | undefined;
  minPrice = 0;
  maxPrice = 0;
  sortType: SortType = 0;
}

export enum SortType {
  Date,
  Name,
  LowPrice,
  HightPrice,
}
