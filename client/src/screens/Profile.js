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
import { fetchCommunities} from '../services/fetchService';
import { ChatLog } from '../components/ChatLog';

export const Profile = ({ navigation }) => {
  const { user } = useUser();
  const [communities, setCommunities] = useState([]);

  const getCommunities = async () => {
    const communities = await fetchCommunities(user.id);
    setCommunities(communities)
  }

  useEffect(() => {
    getCommunities();
    return ()=> setCommunities([]) 
  }, []);

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
          {communities.length > 0 && communities.map((community) => {
            return (
              <Pressable
                key={community.id}
                onPress={() => navigation.navigate('MessagesPage', { city:community })}
              >
                <ChatLog  country={community.country} city={community.city} id={community.id} />
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
