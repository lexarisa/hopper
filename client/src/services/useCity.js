import { useState, useEffect } from 'react';
import { NUMBEO_API_KEY } from '@env';

export const useCity = (url) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      fetch(
        `https://www.numbeo.com/api/rankings_by_city_current?api_key=${NUMBEO_API_KEY}&section=1`
      )
        .then((res) => {
          console.log(res);
          if (!res.ok) throw Error('Something went wrong');
          return res.json();
        })
        .then((data) => {
          setCities(parser(data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const parser = (dataToParse) => {
    return dataToParse.map((item) => {
      return {
        id: item.city_id,
        country: item.country,
        city: item.city_name,
      };
    });
  };
  return { cities };
};
