import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useEffect, useState } from 'react';
import { CityCard } from '../components/CityCard';
import { useCity } from '../services/useCity';
import { useUser } from '../context/UserContext';
import { cityParser } from '../utils/index.utils';

export const Home = ({ navigation }) => {
  const { fetchData } = useCity();
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const { user, isLoggedIn } = useUser();
  const [currentCities, setCurrentCities] = useState({ x: 0, y: 50 });
  const [citiesOnDisplay, setCitiesOnDisplay] = useState([]);

  const handleSearch = () => {
    const temporary = cities.slice(0, 10000);
    return temporary.filter((item) => item.city.includes(search));
  };

  // const scrollCitiesOnEndReached = () => {
  //   setCitiesOnDisplay(
  //     cities.slice(currentCities.x + 50, currentCities.y + 50)
  //   );
  //   setCurrentCities((prev) => ({ x: prev.x + 50, y: prev.y + 50 }));
  // };

  useEffect(() => {
    setCitiesOnDisplay(cities.slice(0, 10000));
    return () => setCitiesOnDisplay({});
  }, [cities]);

  useEffect(() => {
    fetchData().then(
      (data) => {
        setCities(cityParser(data));
      },
      (e) => {
        console.log(e);
      }
    );
    return () => setCities({})
  }, []);

  useEffect(() => {
    if (search === '') setCitiesOnDisplay(cities.slice(0, 10000));
    else setCitiesOnDisplay(handleSearch());
  }, [search]);

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <ImageBackground style={styles.headerBg}>
          <View style={styles.headerContent}>
            {isLoggedIn ? (
              <View style={[styles.headerGreeting]}>
                <Text style={styles.joinText}>Hello, {user.username}</Text>
              </View>
            ) : (
              <View style={[styles.join, styles.headerGreeting]}>
                <Pressable onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.joinText}>Join</Text>
                </Pressable>
              </View>
            )}

            <View style={styles.tagline}>
              <Text style={styles.taglineText}>
                Discover your new remote working location
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          onChangeText={setSearch}
          value={search}
        />
      </View>

      {cities ? (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#E8E8E8',
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 15,
  },
  headerContent: {
    paddingVertical: 30,
    marginVertical: 20,
  },
  app: {
    backgroundColor: 'white',
    flex: 1,
  },
  column: {
    marginHorizontal: 10,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    maxHeight: '60%',
  },
  header: {
    height: '30%',
    alignItems: 'flex-end',
  },
  join: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    // shadowColor: '#000000',
    // shadowOpacity: 0.3,
    // shadowRadius: 1,
    // shadowOffset: {
    //   height: 1,
    //   width: 1,
    // },
  },
  headerGreeting: {
    alignSelf: 'flex-end',
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tagline: {
    margin: 0,
  },
  joinText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taglineText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    color: 'white',
  },
  headerBg: {
    height: '100%',
    width: '100%',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: '#4A56E2',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
