import { NUMBEO_API_KEY } from '@env';

export const useCity = () => {
  const fetchData = () => {
    return fetch(
      `https://www.numbeo.com/api/rankings_by_city_current?api_key=${NUMBEO_API_KEY}&section=1`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });
  };

  // fetchData().then(
  //   (data) => {
  //     setCities(parser(data));
  //   },
  //   (e) => {
  //     console.log(e);
  //   }
  // );

  // const fetchData = async () => {
  //   // use await syntax

  //   try {
  //     fetch(
  //       `https://www.numbeo.com/api/rankings_by_city_current?api_key=${NUMBEO_API_KEY}&section=1`
  //     )
  //       .then((res) => {
  //         console.log(res);
  //         if (!res.ok) throw Error('Something went wrong');
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setCities(parser(data));
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return { fetchData };
};
