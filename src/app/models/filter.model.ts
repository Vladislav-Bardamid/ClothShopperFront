export interface ClothesFilterModel {
  text: string;
  minPrice: number;
  maxPrice: number;
  sortType: SortType
}

export enum SortType {
  Date,
  DateDesc,
  Name,
  NameDesc,
  Price,
  PriceDesc,
}
