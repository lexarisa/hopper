import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useFetch } from '../services/useFetch';
import { NUMBEO_API_KEY } from '@env';
import { UNSPLASH_ACCESS_KEY } from '@env';
import { CustomButton } from './CustomButton';

export const CityDetail = ({ navigation, route }) => {
  const [cityDetail, setCityDetail] = useState([]);

  const { item } = route.params;

  const { data } = useFetch(
    `https://api.unsplash.com/search/photos?query=${item.city}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  useEffect(() => {
    fetchCityDetail();
  }, []);

  const fetchCityDetail = async () => {
    try {
      await Promise.all([
        fetch(
          `https://www.numbeo.com/api/city_prices?api_key=${NUMBEO_API_KEY}&city=${item.city}&country=${item.country}`
        ),
        fetch(
          `https://www.numbeo.com/api/indices?api_key=${NUMBEO_API_KEY}&city=${item.city}&country=${item.country}`
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
          setCityDetail([parser2(data)]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const parser = (dataToParse) => {
    return dataToParse[0].prices.map((price) => {
      return {
        meal: price.item_name,
        mealPrice: price.average_price,
      };
    });
  };

  const parser2 = (dataToParse) => {
    return {
      crimeIndex: dataToParse[1].crime_index,
      qualityOfLife: dataToParse[1].quality_of_life_index,
      safetyIndex: dataToParse[1].safety_index,
      restaurantPriceIndex: dataToParse[1].restaurant_price_index,
      trafficIndex: dataToParse[1].traffic_index,
      rentIndex: dataToParse[1].rent_index,
    };
  };

  const handleJoinRoom = () => {
    navigation.navigate('Messages', { item });
  };

  return (
    <View>
      {data.length > 0 && (
        <View>
          <Image source={{ uri: data[1].image }} style={styles.image} />
        </View>
      )}

      {cityDetail.map((item, index) => {
        return (
          <>
            <View key={index} style={styles.container}>
              <Text>Crime {item.crimeIndex}</Text>
              <Text>Quality of Life: {item.qualityOfLife}</Text>
              <Text>Rent: {item.rentIndex}</Text>
              <Text>Restaurant Price: {item.restaurantPriceIndex}</Text>
              <Text>Safety: {item.safetyIndex}</Text>
              <Text>Traffic: {item.trafficIndex}</Text>
            </View>
          </>
        );
      })}

      <CustomButton text="Join the Community" onPress={handleJoinRoom} />
      {/* <Button
        title="Join the Community"
        accessibilityLabel="Connect to people"
        color="#007AFF"
        onPress={() => handleJoinRoom()}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
  container: {
    margin: 20,
  },
});
