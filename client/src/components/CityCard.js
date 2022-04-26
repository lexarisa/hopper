import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { useFetch } from '../services/useFetch';
import { UNSPLASH_ACCESS_KEY } from '@env';

export const CityCard = ({ city, country }) => {
  const { data } = useFetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  // const textColor = {
  //   color:
  //     parseInt(colorHex.replace('#', ''), 16) > 0xffffff / 1.1
  //       ? 'black'
  //       : 'white',
  // };

  if (data.length === 0) {
    return <Text>Loading...</Text>;
  }
  return (
    // <View style={styles.card}>
    //   <View style={styles.cardContent}>
    <View style={styles.container}>
      {data.length > 0 && (
        <ImageBackground
          source={{ uri: data[1].image }}
          style={styles.image}
          resizeMode="cover"
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
    borderRadius: 50,
    padding: 20,
    margin: 10,
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
  },
  countryName: {
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'white',
  },
  container: {
    borderRadius: 10,
    minWidth: 180,
    minHeight: 100,
  },
  cardContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
