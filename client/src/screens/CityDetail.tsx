import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Bar } from 'react-native-progress';
import { useState, useEffect } from 'react';

import { CustomButton } from '../components/CustomButton';
import { useUser } from '../context/UserContext';
import { CustomCard } from '../components/CustomCard';
import { fetchImages, fetchCityDetail } from '../services/fetchService';
import { IFetchCityDetailInfoFiltered } from '../interfaces/IFetchCityDetailInfo';

export const CityDetail = ({ navigation, route }) => {
  const [cityDetail, setCityDetail] = useState <[ {item:string, itemPrice: number, id: number}[], IFetchCityDetailInfoFiltered[] ] | []> ([]);
  const { user } = useUser();
  const { item } = route.params;
  const city = item;
  const [image, setImage] = useState<{image:string}>(null);

  useEffect(() => {
    fetchCityDetail(city)
      .then(details => setCityDetail(details));
    
    fetchImages(city.city)
      .then((images) => {setImage(images[0]);},
    );
    return setCityDetail([]);
  }, []);

  
  const handleJoinRoom = () => {
    navigation.navigate('Messages', { city });
  };

  const averageSalary = function () {
    if (cityDetail.length > 1) {
      const salary = cityDetail[0]?.filter((detail) => detail.id === 105);
      return salary;
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.cityImg}>
        {image && (
          <View>
            <Image source={{ uri: image.image }} style={styles.image} />
          </View>
        )}

        <View style={styles.cityName}>
          <Text style={styles.name}>
            {city.city}, {city.country}
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
        <View>
          {cityDetail.length > 1 && (
            <FlatList
              horizontal={true}
              data={cityDetail[0]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.container}>
                  <CustomCard
                    colorHex="#FFF"
                    fontColor="#1C2126"
                    descriptionColor="#727981"
                    width={200}
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
                <View style={styles.bar}>
                  <Text style={styles.index}>Crime</Text>
                  <Bar
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
                  <Bar
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
                  <Bar
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
                  <Bar
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
                  <Bar
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
                  <Bar
                    unfilledColor="#eceefc"
                    color="#4A56E2"
                    height={20}
                    borderRadius={8}
                    progress={Math.round((item.trafficIndex / 350) * 100) / 100}
                    width={330}
                  />
                </View>
                
              </View>
            );
          })}

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
