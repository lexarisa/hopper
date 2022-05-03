export interface IFetchCityDetailPrice {
  city_id: number;
  contributors: number;
  contributors12months: number;
  currency: string;
  monthLastUpdate: number;
  name: string;
  prices: IPrice[];
  yearLastUpdate: number;

}

interface IPrice {
  average_price: number;
  data_points: number;
  highest_price: number;
  item_id: number;
  item_name: string;
  lowest_price: number;
}