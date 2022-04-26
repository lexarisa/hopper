import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  // const fetchData = async () => {
  //   try {
  //     fetch(url)
  //       .then((res) => {
  //         if (!res.ok) throw Error('Something went wrong');
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setData(imageParser(data));
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const imageParser = (dataToParse) => {
  //   return dataToParse.results.map((item) => {
  //     return {
  //       id: item.user.id,
  //       photographer: item.user.first_name,
  //       image: item.urls.regular,
  //     };
  //   });
  // };

  const fetchImages = () => {
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });
  };
  // fetchImages().then(
  //   (data) => {
  //     setData(imageParser(data));
  //   },
  //   (e) => {
  //     console.log(e);
  //   }
  // );

  return { fetchImages };
};
