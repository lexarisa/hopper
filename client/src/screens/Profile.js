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

export const Profile = ({ navigation }) => {
  const { user, logout } = useUser();
  const [communitiesJoined, setCommunitiesJoined] = useState([]);
  // const { cities } = useCity();
  const { fetchData } = useCity();
  const isFocused = useIsFocused();
  const [cities, setCities] = useState([]);

  // TODO Share cities state. 
  // perhaps this is a case of shared state rather than another fetch?
  // This function is requesting ALL of the cities from the api again
  // and then mapping over all of them to remove extra data. 
  // and then, she's only rendering the few communities that a user has joined. 
  // Another idea is that we can add community id's onto the user model?
  // That way we can request only the communities we need from the numbeo api. 
  useEffect(() => { 
    fetchCommunitiesJoined().then((data) => { 
      console.log('>>>>>',data)
      setCommunitiesJoined(data)
    });
  }, [isFocused]); // why is this happening? And why re render?

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

  const fetchCommunitiesJoined = () => {
    return fetch(`${SERVERURL}/communities/${user.id}`)
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

  //how to navigate back to chatroom
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
