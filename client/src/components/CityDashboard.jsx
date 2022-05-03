import { View, FlatList, Pressable, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { CityCard } from "./CityCard";
import { fetchCities } from "../services/fetchService";
import { cityParser } from "../utils/index.utils";


export default function CityDashboard({navigation}) {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [citiesOnDisplay, setCitiesOnDisplay] = useState([]);

  const handleSearch = () => {
    const temporary = cities.slice(0, 10000);
    return temporary.filter((item) => item.city.includes(search));
  };

  useEffect(() => {
    setCitiesOnDisplay(cities.slice(0, 10000));
  }, [cities]);

  useEffect(() => {
    fetchCities().then(
      (data) => {
        setCities(cityParser(data));
      },
      (e) => {
        console.log(e);
      }
    );
    return () => setCities([])
  }, []);

  useEffect(() => {
    if (search === '') setCitiesOnDisplay(cities.slice(0, 10000));
    else setCitiesOnDisplay(handleSearch());
  }, [search]);

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          onChangeText={setSearch}
          value={search}
        />
      </View>

      {
        cities ? (
          <View style={styles.container}>
            <FlatList
              data={citiesOnDisplay}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
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


