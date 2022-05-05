// @ts-nocheck
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { CustomButton } from '../components/CustomButton';
import { useUser } from '../context/UserContext';
import { fetchImages, fetchCityDetail } from '../services/fetchService';
import { IFetchCityDetailInfoFiltered } from '../interfaces/IFetchCityDetailInfo';

import CityLifeQualityInfo from '../components/CityLifeQualityInfo';
import CityPriceInfo from '../components/CityPriceInfo';

export const CityDetail = ({ navigation, route }) => {
  const [cityDetail, setCityDetail] = useState<[{ item: string, itemPrice: number, id: number }[], IFetchCityDetailInfoFiltered[]] | []>([]);
  const { user } = useUser();
  const { item } = route.params;
  const city = item;
  const [image, setImage] = useState<{ image: string }>(null);

  useEffect(() => {
    fetchCityDetail(city)
      .then(details => setCityDetail(details));

    fetchImages(city.city)
      .then((images) => { setImage(images[0]); },
    );
    return setCityDetail([]);
  }, []);

  const handleJoinRoom = () => {
    navigation.navigate('Messages', { city });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        {image && (
          <View>
            <Image source={{ uri: image.image }} style={styles.image} />
          </View>
        )}
        <Text style={styles.name}>
          {city.city}, {city.country}
        </Text>

        <CityPriceInfo cityPrices={cityDetail[0]} />

        <Text style={styles.header}>Quality of Life Index</Text>
        {cityDetail.length > 1 &&
          cityDetail[1].map((qualityOfLife) => (
            <CityLifeQualityInfo qualityOfLife={qualityOfLife} key={item.id} />
          ))
        }

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
});
