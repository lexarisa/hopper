import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useFetch } from '../services/useFetch';
import { NUMBEO_API_KEY } from '@env';
import { UNSPLASH_ACCESS_KEY } from '@env';
import { CustomButton } from '../components/CustomButton';
import { useUser } from '../context/UserContext';
import { parser, parser2 } from '../utils/index.utils';
import { CustomCard } from '../components/CustomCard';
import { FlatList } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { imageParser } from '../utils/index.utils';

import getSymbolFromCurrency from 'currency-symbol-map';

export const CityDetail = ({ navigation, route }) => {
  const [cityDetail, setCityDetail] = useState([]);
  const { user } = useUser();
  const { item } = route.params;
  const [image, setImage] = useState([]);

  const { fetchImages } = useFetch(
    `https://api.unsplash.com/search/photos?query=${item.city}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  useEffect(() => {
    fetchCityDetail();
  }, []);

  useEffect(() => {
    fetchImages().then(
      (data) => {
        setImage(imageParser(data));
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  console.log(image);
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
          setCityDetail([[...parser(data)], [parser2(data)]]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = () => {
    navigation.navigate('Messages', { item });
  };

  const averageSalary = function () {
    if (cityDetail.length > 1) {
      const salary = cityDetail[0].filter((detail) => detail.id === 105);
      return salary;
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.cityImg}>
        {image.length > 0 && (
          <View>
            <Image source={{ uri: image[1].image }} style={styles.image} />
          </View>
        )}

        <View style={styles.cityName}>
          <Text style={styles.name}>
            {item.city}, {item.country}
          </Text>
          <Text style={styles.header}>Average Monthly Salary</Text>
          <View style={styles.salaryCard}>
            {cityDetail.length > 1 && (
              <CustomCard
                colorHex="#4A56E2"
                fontColor="#FFF"
                descriptionColor="#EFF1F3"
                description="USD"
                width="90%"
                price={Math.round(averageSalary()[0].itemPrice)}
              />
            )}
          </View>
          <Text style={styles.header}>Cost of Living</Text>
        </View>
        <View style={styles.scrollable}>
          {cityDetail.length > 1 && (
            <FlatList
              horizontal={true}
              data={cityDetail[0]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.container}>
                  <CustomCard
                    colorHex="#FFF"
                    fontColor="#1C2126"
                    descriptionColor="#727981"
                    width={140}
                    description={item.item}
                    price={Math.round(item.itemPrice)}
                  />
                </View>
              )}
            />
          )}
        </View>
        <Text style={styles.header}>Quality of Life Index</Text>
        {cityDetail.length > 1 &&
          cityDetail[1].map((item) => {
            return (
              <View key={item.id} style={styles.barCharts}>
                {/* <ProgressBar progress={0.7} width={200} animated={true} /> */}
                <View style={styles.bar}>
                  <Text style={styles.index}>Crime</Text>
                  <Progress.Bar
                    unfilledColor="#eceefc"
                    height={20}
                    color="#4A56E2"
                    borderRadius={8}
                    progress={Math.round((item.crimeIndex / 120) * 100) / 100}
                    width={330}
                  />
                </View>
                <View style={styles.bar}>
                  <Text style={styles.index}>Quality of Life</Text>
                  <Progress.Bar
                    unfilledColor="#eceefc"
                    height={20}
                    color="#4A56E2"
                    borderRadius={8}
                    progress={Math.round(item.qualityOfLife) / 240}
                    width={330}
                  />
                </View>
                <View style={styles.bar}>
                  <Text style={styles.index}>Rent</Text>
                  <Progress.Bar
                    unfilledColor="#eceefc"
                    height={20}
                    color="#4A56E2"
                    borderRadius={8}
                    progress={Math.round((item.rentIndex / 100) * 100) / 100}
                    width={330}
                  />
                </View>
                <View style={styles.bar}>
                  <Text style={styles.index}>Safety</Text>
                  <Progress.Bar
                    unfilledColor="#eceefc"
                    height={20}
                    color="#4A56E2"
                    borderRadius={8}
                    progress={Math.round(item.safetyIndex) / 100}
                    width={330}
                  />
                </View>
                <View style={styles.bar}>
                  <Text style={styles.index}>Restaurant Price</Text>
                  <Progress.Bar
                    unfilledColor="#eceefc"
                    progress={
                      Math.round((item.restaurantPriceIndex / 170) * 100) / 100
                    }
                    color="#4A56E2"
                    borderRadius={8}
                    height={20}
                    width={330}
                  />
                </View>
                <View style={styles.bar}>
                  <Text style={styles.index}>Traffic</Text>
                  <Progress.Bar
                    unfilledColor="#eceefc"
                    color="#4A56E2"
                    height={20}
                    borderRadius={8}
                    progress={Math.round((item.trafficIndex / 350) * 100) / 100}
                    width={330}
                  />
                </View>
                {/* <Text>Crime {Math.round(item.crimeIndex)}</Text>
                <Text>Quality of Life: {Math.round(item.qualityOfLife)}</Text>
                <Text>Rent: {Math.round(item.rentIndex)}</Text>
                <Text>
                  Restaurant Price: {Math.round(item.restaurantPriceIndex)}
                </Text>
                <Text>Safety: {Math.round(item.safetyIndex)}</Text>
                <Text>Traffic: {Math.round(item.trafficIndex)}</Text> */}
              </View>
            );
          })}

        {/* <VictoryChart width={350}>
          <VictoryBar data={testData} x="quarter" y="earnings" />
        </VictoryChart> */}
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
    marginBottom: 20,
  },
  image: {
    height: 200,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  container: {
    marginHorizontal: 10,
    flexDirection: 'column',
  },
  barCharts: {
    alignItems: 'center',
  },
  cityImg: {},
  cityName: {},
  name: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 25,
    marginVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  salaryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  index: {
    fontSize: 17,
    marginBottom: 10,
  },
  bar: {
    marginBottom: 7,
  },
});
