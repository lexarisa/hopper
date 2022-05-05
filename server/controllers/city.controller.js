const NUMBEO_API_KEY = process.env['NUMBEO_API_KEY'];
const UNSPLASH_ACCESS_KEY = process.env['UNSPLASH_ACCESS_KEY']
const axios = require('axios');

const getCities = async (req, res) => {
  const url = 'https://www.numbeo.com/api/rankings_by_city_current'
  try {
    const response = await axios.get(url, {
      params: {
        api_key: NUMBEO_API_KEY,
        section:1
      }
    });
    const cities = response.data.map(city => {
      return {
        id: city.city_id, 
        country: city.country,
        city: city.city_name
      }
    })
    res.status(200).send(cities)
  } catch (e) {
    console.error(e);
    res.status(400).send([])
  }

}

const getCityImages = async (req, res) => {
  const { cityName } = req.params;
  const url = 'https://api.unsplash.com/search/photos'
  try {
    const response = await axios.get(url, {
      params: {
        query: cityName,
        client_id: UNSPLASH_ACCESS_KEY
      }
    })
    
    const images = response.data.results.map(image => {
      return {
        id: image.user.id,
        photographer: image.user.first_name, 
        image: image.urls.regular,
      }
    })
    res.status(200).send(images);
  } catch (e) {
    console.error(e);
    res.status(400).send([])
  }
}

const getCityIndices = async (req, res) => {
  const {city, country} = req.params;
  const url = 'https://www.numbeo.com/api/indices';
  try {
    const response = await axios.get(url, {
      params:{
        api_key: NUMBEO_API_KEY,
        city: city,
        country: country,
      }
    })
    const indices = response.data;
    res.status(200).send(
      {
        id: indices.city_id,
        crime_index: indices.crime_index,
        qualityOfLife: indices.quality_of_life_index,
        safetyIndex: indices.safety_index,
        restaurantPriceIndex: indices.restaurant_price_index,
        trafficIndex: indices.traffic_index,
        rentIndex: indices.rent_index
      }
    )     
  } catch(e) {
    res.status(400).send([])
  }
}

const getCityPrices= async (req, res) => {
  const {city, country} = req.params;
  const url = 'https://www.numbeo.com/api/city_prices'
  try {
    const response = await axios.get(url, {
      params:{
        api_key: NUMBEO_API_KEY,
        city: city,
        country: country,
        currency:"USD"
      }
    })
    const categoryIds = [1,4,18,26,27,30,105];
    const categories = response.data.prices.filter(category => categoryIds.includes(category.item_id));
    const prices = categories.map(category => {
      return {
        item: category.item_name,
        itemPrice: category.average_price,
        id: category.item_id
      }
    })
    res.status(200).send(prices)
  } catch (e) {
    res.status(400).send([])
  }
  

}

module.exports = { getCities, getCityImages, getCityIndices, getCityPrices }