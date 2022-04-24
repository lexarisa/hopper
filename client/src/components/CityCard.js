import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { useFetch } from '../services/useFetch';
import { UNSPLASH_ACCESS_KEY } from '@env';
import { useEffect, useState } from 'react';

export const CityCard = ({ city, country }) => {
  const { data } = useFetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

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
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.countryName}>{country}</Text>
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
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  countryName: {
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  container: {
    borderRadius: 10,
    minWidth: 180,
    minHeight: 100,
  },
});
