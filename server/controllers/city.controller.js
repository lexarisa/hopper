const NUMBEO_API_KEY = process.env['NUMBEO_API_KEY'];
const UNSPLASH_ACCESS_KEY = process.env['UNSPLASH_ACCESS_KEY']
const axios = require('axios')

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
  console.log(cityName)
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

const getCityDetails = async (req, res) => {

}

module.exports = { getCities, getCityImages, getCityDetails }