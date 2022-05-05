import config from "../../app.config";
import { cityParser, imageParser } from "../utils/index.utils";

const NUMBEO_API_KEY = config['NUMBEO_API_KEY']
const UNSPLASH_ACCESS_KEY = config['UNSPLASH_ACCESS_KEY']
const HOST = config['HOST'];
const PORT = config['PORT'];

export const fetchImages = async (city) => {
  const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
  const res = await fetch(url);
  if (res.ok) {
    const imagesData = await res.json();
    const images = imageParser(imagesData);
    return images;
  } else {
    return Promise.resolve([]);
  }
};

export const fetchCities = async () => {
  const url = `https://www.numbeo.com/api/rankings_by_city_current?api_key=${NUMBEO_API_KEY}&section=1`
  const res = await fetch(url);
  if (res.ok) {
    const citiesData = await res.json();
    const cities = cityParser(citiesData);
    return cities;
  } else {
    return Promise.resolve([])
  }
};

export const fetchCommunities = async (userId) => {
  const cities = await fetchCities();
  const url = `http://${HOST}:${PORT}/communities/${userId}`;
  const res = await fetch(url);

  if (res.ok) {
    const communitiesData = await res.json();
    const communityIds = communitiesData.map(community => community.communityId);
    const communities = cities.filter(city => communityIds.includes(city.id));
    return communities
  } else {
    return Promise.resolve([])
  }
};

export const fetchMessages = async (communityId) => {
  const url = `http://${HOST}:${PORT}/messages/${communityId}`
  const res = await fetch(url);
  if (res.ok) {
    const messages = await res.json();
    return messages
  } else {
    return Promise.resolve([])
  }
};