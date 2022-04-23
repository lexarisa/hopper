import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';
import { CityCard } from '../components/CityCard';
import { useCity } from '../services/useCity';

// import { UNSPLASH_ACCESS_KEY } from '@env';

export const Home = ({ navigation }) => {
  const { cities } = useCity();
  const [search, setSearch] = useState('');

  const handleSearch = (searchValue) => {
    if (searchValue === '') return;
    setSearch(cities.filter((item) => item.city.includes(searchValue)));
  };

  return (
    <>
      <View style={styles.header}>
        <ImageBackground style={styles.headerBg}>
          <View style={styles.join}>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.joinText}>Join</Text>
            </Pressable>
          </View>
          <View style={styles.tagline}>
            <Text style={styles.taglineText}>
              Discover your new remote working location
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          // onChangeText={() => handleSearch()}
          // value={search}
        />
      </View>

      <View style={styles.container}>
        {cities ? (
          <FlatList
            data={cities.slice(0, 50)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate('CityDetail', { item })}
              >
                <CityCard city={item.city} country={item.country} />
              </Pressable>
            )}
            initialNumToRender={50}
            horizontal={false}
            numColumns={2}
          />
        ) : (
          <Text>No Cities to show</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 15,
  },

  column: {
    marginHorizontal: 10,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    height: '30%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  join: {
    alignSelf: 'flex-end',
    margin: 20,
    backgroundColor: '#3B71F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  tagline: {
    margin: 10,
  },
  joinText: {
    color: 'white',
  },
  taglineText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  headerBg: {
    height: '100%',
    width: '100%',
    backgroundColor: '#D9AFD9',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
