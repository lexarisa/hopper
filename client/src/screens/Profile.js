import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { SERVERURL } from '../utils/index.utils';
import { useCity } from '../services/useCity';

export const Profile = () => {
  const { user, logout } = useUser();
  const [communitiesJoined, setCommunitiesJoined] = useState([]);
  const { cities } = useCity();

  useEffect(() => {
    fetchCommunitiesJoined();
  }, []);

  const fetchCommunitiesJoined = async () => {
    console.log('fetchCommunitieddsJoined()');
    try {
      const res = await fetch(`${SERVERURL}/communities/${user.id}`);
      const communityMember = await res.json();
      console.log(communityMember);
      setCommunitiesJoined(communityMember);
    } catch (error) {
      console.log(error);
    }
  };

  const communitiesIdUsersIn = communitiesJoined.map(
    (community) => community.communityId
  );

  const listOfCommunities = cities.filter((city) => {
    return communitiesIdUsersIn.includes(city.id);
  });

  console.log(listOfCommunities);
  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <View style={styles.userImg}>
            <Text style={styles.username}>{user.username.charAt(0)}</Text>
          </View>
          <Text style={styles.greeting}>Hello, {user.username}</Text>
        </View>
        <Text>Inbox</Text>
        <View style={styles.container}>
          {listOfCommunities.map((community) => {
            return (
              <View key={community.id} style={styles.content}>
                <Text style={styles.text}>
                  {community.city}, {community.country}
                </Text>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 20,
  },
  userImg: {},
  container: {
    margin: 10,
  },
  content: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#F9FBFC',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 1,
    },
  },
});
