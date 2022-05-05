export interface IFetchCityDetailInfo {
  city_id: number;
  climate_index: number;
  contributors_cost_of_living: number;
  contributors_crime: number;
  contributors_healthcare: number;
  contributors_pollution: number;
  contributors_property: number;
  contributors_traffic: number;
  cpi_and_rent_index: number;
  cpi_index: number;
  crime_index: number;
  groceries_index: number;
  health_care_index: number;
  name: string;
  pollution_index: number;
  property_price_to_income_ratio: number;
  purchasing_power_incl_rent_index: number;
  quality_of_life_index: number;
  rent_index: number;
  restaurant_price_index: number;
  safety_index: number;
  traffic_co2_index: number;
  traffic_index: number;
  traffic_inefficiency_index: number;
  traffic_time_index: number;
};

export interface IFetchCityDetailInfoFiltered {
  id: number;
  crimeIndex: number;
  qualityOfLife: number;
  safetyIndex: number;
  restaurantPriceIndex: number;
  trafficIndex: number;
  rentIndex: number;
}