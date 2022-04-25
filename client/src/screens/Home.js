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
import { useUser } from '../context/UserContext';

export const Home = ({ navigation }) => {
  const { cities } = useCity();
  const [search, setSearch] = useState('');
  const { user, isLoggedIn } = useUser();

  const handleSearch = (searchValue) => {
    if (searchValue === '') return;
  };

  console.log('cities', cities);
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
          // onChangeText={() => handleSearch()}
          // value={search}
        />
      </View>

      <View style={styles.container}>
        {cities ? (
          <FlatList
            data={cities.slice(0, 60)}
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
    flexWrap: 'wrap',
  },
  app: {
    backgroundColor: 'white',
  },

  column: {
    marginHorizontal: 10,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    height: '25%',
    alignItems: 'center',
  },
  join: {
    backgroundColor: '#3B71F3',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  headerGreeting: {
    alignSelf: 'flex-end',
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tagline: {
    margin: 10,
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
    marginHorizontal: 15,
    color: 'white',
    flexWrap: 'wrap',
  },
  headerBg: {
    height: '100%',
    width: '100%',
    backgroundColor: '#72A0C1',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
