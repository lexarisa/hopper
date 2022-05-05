import config from "../../app.config";

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

export const fetchCityDetail = async (city) => {
  const pricesUrl = `http://${HOST}:${PORT}/cities/${city.city}/${city.country}/details/prices`
  const indicesUrl = `http://${HOST}:${PORT}/cities/${city.city}/${city.country}/details/indices`
  const resPrices = await fetch(pricesUrl);
  const resIndices = await fetch(indicesUrl);

  if (resPrices.ok && resIndices.ok) {
    const prices = await resPrices.json();
    const indices = await resIndices.json();
    return [[...prices], [indices]]
  } else {
    return [[],[]]
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

