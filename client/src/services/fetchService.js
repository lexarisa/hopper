import config from "../../app.config";

const NUMBEO_API_KEY = config['NUMBEO_API_KEY']
const UNSPLASH_ACCESS_KEY = config['UNSPLASH_ACCESS_KEY']

export const fetchImages = async (city) => {
  const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
  const res = await fetch(url);
  if (res.ok) {
    const images = await res.json();
    return images;
  } else {
    return [];
  }

  // return fetch(url).then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject(res);
  //   }
  // });
};

export const fetchCities = async () => {
  const url = `https://www.numbeo.com/api/rankings_by_city_current?api_key=${NUMBEO_API_KEY}&section=1`
  const res = await fetch(url);
  if (res.ok) {
    const cities = await res.json();
    return cities;
  } else {
    return []
  }
  // return fetch(url).then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject(res);
  //   }
  // });
};