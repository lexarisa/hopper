import { View, FlatList, Pressable, TextInput, Text,  StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";

import { CityCard } from "./CityCard";
import { fetchCities } from "../services/fetchService";
import { cityParser } from "../utils/index.utils.tsx";


export default function CityDashboard({ navigation }) {
  const [cities, setCities] = useState([]);
  const [citiesOnDisplay, setCitiesOnDisplay] = useState([]);

  const handleSearch = (e) => {
    if (e && e.trim() !== '') {
      const temporary = cities.slice(0, 10000);
      const searchResult = temporary.filter((item) =>  { 
        return (
          (item.city.toLowerCase().includes(e.toLowerCase())) || 
          (item.country.toLowerCase().includes(e.toLowerCase()))
        );
      });
      setCitiesOnDisplay(searchResult);
    } else {
      setCitiesOnDisplay(cities.slice(0, 50))
    }

  };

  async function getCities() {
    const cities = await fetchCities();
    const parsedCities = cityParser(cities);
    setCities(parsedCities);
    setCitiesOnDisplay(parsedCities.slice(0,50));
  }

  useEffect(() => {
    getCities();
    return () => setCities([])
  }, []);

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          onChangeText={(e) => handleSearch(e)}
        />
      </View>

      {
        citiesOnDisplay.length > 0 ? (
          <View style={styles.container}>
            <FlatList
              testID="cities"
              data={citiesOnDisplay}
              keyExtractor={(item) => item.id}
              renderItem={( {item} ) => (
                <Pressable
                  onPress={() => navigation.navigate('CityDetail', { item })}
                >
                  <CityCard city={item.city} country={item.country} />
                </Pressable>
              )}
              horizontal={false}
              numColumns={2}
            />
          </View>
        ) : (
          <Text>No Cities to show</Text>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#E8E8E8',
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 15,
  },

  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    maxHeight: '60%',
  },
});


