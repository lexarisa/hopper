export interface IFetchCity {
  city_id: number;
  city_name: string;
  country: string;
  cpi_and_rent_index: number;
  cpi_index: number;
  groceries_index: number;
  purchasing_power_incl_rent_index: number;
  rent_index: number;
  restaurant_price_index: number;
}

export interface IFetchCityFiltered {
  id: number;
  country: string;
  city: string;
}