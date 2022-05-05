import config from "../../app.config";
import { IFetchCityDetailPrice } from "../interfaces/IFetchCityDetailPrice";
import { IFetchCityDetailInfo, IFetchCityDetailInfoFiltered } from "../interfaces/IFetchCityDetailInfo";
import { IFetchCity,IFetchCityFiltered } from "../interfaces/IFetchCity";
import { IFetchImageData, IFetchImageDataFiltered } from "../interfaces/IFetchImageData";

const HOST = config['HOST']
const PORT = config['PORT']

export const parser2 = (dataToParse: [IFetchCityDetailPrice, IFetchCityDetailInfo]): IFetchCityDetailInfoFiltered  => {
  return {
    id: dataToParse[1].city_id,
    crimeIndex: dataToParse[1].crime_index,
    qualityOfLife: dataToParse[1].quality_of_life_index,
    safetyIndex: dataToParse[1].safety_index,
    restaurantPriceIndex: dataToParse[1].restaurant_price_index,
    trafficIndex: dataToParse[1].traffic_index,
    rentIndex: dataToParse[1].rent_index,
  };
};

export const parser = (dataToParse: [IFetchCityDetailPrice, IFetchCityDetailInfo]): {item:string, itemPrice: number, id: number}[] => {
  const handPickedData = [1, 4, 18, 26, 27, 30, 105];
  //filter to get only the id i want

  return dataToParse[0].prices
    .filter((item) => handPickedData.includes(item.item_id))
    .map((item) => {
      return {
        item: item.item_name,
        itemPrice: item.average_price,
        id: item.item_id,
      };
    });
};

export const SERVERURL = `http://${HOST}:${PORT}`;
