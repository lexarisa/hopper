import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { SERVERURL } from '../utils/index.utils';
import { useCity } from '../services/useCity';
import { ChatLog } from '../components/ChatLog';
import { useIsFocused } from '@react-navigation/native';
import { cityParser } from '../utils/index.utils';
import { HOST } from '@env';

export const Profile = ({ navigation }) => {
  const { user, logout } = useUser();
  const [communitiesJoined, setCommunitiesJoined] = useState([]);
  // const { cities } = useCity();
  const { fetchData } = useCity();
  const isFocused = useIsFocused();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCommunitiesJoined().then((data) => setCommunitiesJoined(data));
  }, [isFocused]);

  useEffect(() => {
    fetchData().then(
      (data) => {
        setCities(cityParser(data));
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  // const fetchCommunitiesJoined = async () => {
  //   console.log('fetchCommunitiesJoined()');
  //   try {
  //     const res = await fetch(`${SERVERURL}/communities/${user.id}`);
  //     const communityMember = res.json();
  //     console.log('>>>', communityMember);
  //     setCommunitiesJoined(communityMember);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchCommunitiesJoined = () => {
    return fetch(`http://${HOST}:3002/communities/${user.id}`)
      .then((res) => (res.status < 400 ? res : Promise.reject(res)))
      .then((data) => data.json())
      .catch((er) => console.log(er));
  };

  const communitiesIdUsersIn = communitiesJoined.map(
    (community) => community.communityId
  );

  const listOfCommunities = cities.filter((city) => {
    return communitiesIdUsersIn.includes(city.id);
  });

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.user}>
          <View style={styles.userImg}>
            <Text style={styles.username}>{user.username.charAt(0)}</Text>
          </View>
          <Text style={styles.greeting}>Hello, {user.username}</Text>
        </View>
        <Text style={styles.header}>Your Communities</Text>
        <View style={styles.container}>
          {listOfCommunities.map((item) => {
            return (
              <Pressable
                key={item.id}
                onPress={() => navigation.navigate('MessagesPage', { item })}
              >
                <ChatLog country={item.country} city={item.city} id={item.id} />
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  greeting: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 20,
  },
  userImg: {
    backgroundColor: '#24CCA7',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    margin: 10,
  },

  header: {
    fontSize: 18,
    marginHorizontal: 25,
  },
});
