import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  ImageBackground,  
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
 
  const image = {
    uri: `https://gradient-avatar.glitch.me/${user.username}?size=45`,
  };
  
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.user}>
          <View style={styles.userImgContainer}>
            <ImageBackground
              source={image}
              style={styles.userImg}
              imageStyle={{ borderRadius: 35 }}
            >
              <Text style={styles.username}>{user.username.charAt(0)}</Text>
            </ImageBackground>
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
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 5
  },
  username: {
    // position: 'absolute',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  greeting: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 20,
  },
  userImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  container: {
    margin: 10,
  },

  header: {
    fontSize: 18,
    marginHorizontal: 25,
  },
});
