import { View, FlatList, Pressable, TextInput, Text,  StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { CityCard } from "./CityCard";
import { fetchCities } from "../services/fetchService";


let citiesStorage = [];
export default function CityDashboard({ navigation }) {
  const [citiesOnDisplay, setCitiesOnDisplay] = useState([]);

  const handleSearch = (e) => {
    if (e && e.trim() !== '') {
      const temporary = citiesStorage.slice(0, 10000);
      const searchResult = temporary.filter((city) =>  { 
        return (
          (city.city.toLowerCase().includes(e.toLowerCase())) || 
          (city.country.toLowerCase().includes(e.toLowerCase()))
        );
      });
      setCitiesOnDisplay(searchResult);
    } else {
      setCitiesOnDisplay(citiesStorage.slice(0, 50))
    }
  };

  async function getCities() {
    const cities = await fetchCities();
    citiesStorage = [...cities];
    setCitiesOnDisplay(cities.slice(0,50));
  }

  useEffect(() => {
    getCities();
    return () => setCitiesOnDisplay([])
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
              data={citiesOnDisplay}
              keyExtractor={(city) => city.id}
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
    maxHeight: '70%',
  },
});


