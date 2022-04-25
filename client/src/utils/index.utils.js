export const parser2 = (dataToParse) => {
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

export const parser = (dataToParse) => {
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

export const SERVERURL = `http://localhost:3002`;
