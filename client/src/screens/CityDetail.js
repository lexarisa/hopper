import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useFetch } from '../services/useFetch';
import { NUMBEO_API_KEY } from '@env';
import { UNSPLASH_ACCESS_KEY } from '@env';
import { CustomButton } from '../components/CustomButton';
import { useUser } from '../context/UserContext';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const testData = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export const CityDetail = ({ navigation, route }) => {
  const [cityDetail, setCityDetail] = useState([]);
  const { user } = useUser();
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
          console.log(data[1]);
          setCityDetail([[...parser(data)], [parser2(data)]]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const parser = (dataToParse) => {
    const handPickedData = [1, 4, 18, 26, 27, 30, 105];
    //filter to get only the id i want
    return dataToParse[0].prices
      .filter((item) => handPickedData.includes(item.item_id))
      .map((item) => {
        return {
          item: item.item_name,
          itemPrice: item.average_price,
          id: item.item_id,
        };
      });
  };

  const parser2 = (dataToParse) => {
    return {
      id: dataToParse[1].city_id,
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

  console.log('hello', cityDetail);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.cityImg}>
        {data.length > 0 && (
          <View>
            <Image source={{ uri: data[1].image }} style={styles.image} />
          </View>
        )}
        <View style={styles.cityName}>
          <Text style={styles.name}>
            {item.city}, {item.country}
          </Text>
        </View>
        {cityDetail.length > 1 &&
          cityDetail[0].map((item) => {
            return (
              <View key={item.id} style={styles.container}>
                <Text>
                  {item.item}: ${Math.round(item.itemPrice)}
                </Text>
              </View>
            );
          })}
        {cityDetail.length > 1 &&
          cityDetail[1].map((item) => {
            return (
              <View key={item.id} style={styles.container}>
                <Text>Crime {item.crimeIndex}</Text>
                <Text>Quality of Life: {item.qualityOfLife}</Text>
                <Text>Rent: {item.rentIndex}</Text>
                <Text>Restaurant Price: {item.restaurantPriceIndex}</Text>
                <Text>Safety: {item.safetyIndex}</Text>
                <Text>Traffic: {item.trafficIndex}</Text>
              </View>
            );
          })}

        <VictoryChart width={350}>
          <VictoryBar data={testData} x="quarter" y="earnings" />
        </VictoryChart>
        <View style={styles.button}>
          {user ? (
            <CustomButton text="Join the Community" onPress={handleJoinRoom} />
          ) : (
            <CustomButton
              text="Join the Community"
              onPress={() => navigation.navigate('Register')}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: 20,
  },
  image: {
    height: 200,
  },
  container: {
    marginHorizontal: 20,
  },
  cityImg: {},
  cityName: {},
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 25,
    marginVertical: 20,
  },
});