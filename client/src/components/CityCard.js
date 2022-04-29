import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { useFetch } from '../services/useFetch';
import { UNSPLASH_ACCESS_KEY } from '@env';
import { useState, useEffect } from 'react';
import { imageParser } from '../utils/index.utils';

const UNSPLASH = UNSPLASH_ACCESS_KEY

export const CityCard = ({ city, country }) => {
  const [data, setData] = useState([]);
  const { fetchImages } = useFetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH}`
  );

  // const textColor = {
  //   color:
  //     parseInt(colorHex.replace('#', ''), 16) > 0xffffff / 1.1
  //       ? 'black'
  //       : 'white',
  // };

  useEffect(() => {
    fetchImages().then(
      (data) => {
        setData(imageParser(data));
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  if (data === undefined) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      {data.length > 0 && (
        <ImageBackground
          source={{ uri: data[1].image }}
          style={styles.image}
          resizeMode="cover"
          imageStyle={{ borderRadius: 5 }}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cityName]}>{city}</Text>
            <Text style={[styles.countryName]}>{country}</Text>
          </View>
        </ImageBackground>
      )}
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 5,
    height: 145,
    width: 175,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  cityName: {
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  countryName: {
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  container: {
    borderRadius: 50,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
