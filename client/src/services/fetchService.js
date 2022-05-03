import config from "../../app.config";

const NUMBEO_API_KEY = config['NUMBEO_API_KEY']
const UNSPLASH_ACCESS_KEY = config['UNSPLASH_ACCESS_KEY']

export const fetchImages = (city) => {
  const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`

  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export const fetchCities = () => {
  const url = `https://www.numbeo.com/api/rankings_by_city_current?api_key=${NUMBEO_API_KEY}&section=1`
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};