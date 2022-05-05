import config from "../../app.config";
import {parser, parser2 } from "../utils/index.utils";
const NUMBEO_API_KEY = config['NUMBEO_API_KEY']
const HOST = config['HOST'];
const PORT = config['PORT'];

export const fetchImages = async (cityName) => {
  const url = `http://${HOST}:${PORT}/cities/${cityName}/images`;
  const res = await fetch(url);
  if (res.ok) {
    const images = await res.json();
    return images;
  } else {
    return Promise.resolve([]);
  }
};

export const fetchCities = async () => {
  const url = `http://${HOST}:${PORT}/cities/`;

  const res = await fetch(url);
  if (res.ok) {
    const cities = await res.json();
    return cities;
  } else {
    return Promise.resolve([])
  }
};

export const fetchCityDetail = (city) => {
  return Promise.all([
    fetch(
      `https://www.numbeo.com/api/city_prices?api_key=${NUMBEO_API_KEY}&city=${city.city}&country=${city.country}&currency=USD`
    ),
    fetch(
      `https://www.numbeo.com/api/indices?api_key=${NUMBEO_API_KEY}&city=${city.city}&country=${city.country}`
    ),
  ])
  .then((responses) => {
    return Promise.all(
      responses.map((response) => {
        return response.json();
      })
    );
  })
  .then((data) => {
    return [[...parser(data)], [parser2(data)]];
  })
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

