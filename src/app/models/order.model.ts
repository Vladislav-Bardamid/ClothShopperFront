export interface Order {
  clothId: number;
  userId: number;
  orderListId: number;
  text: string;
  title: string;
  scrap: string;
  date: string;
  width: string;
  height: string;
  price: number;
  urlSm: string;
  urlMd: string;
  urlLg: string;
  isSuccess: boolean;
}
