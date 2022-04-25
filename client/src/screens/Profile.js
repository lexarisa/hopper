import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { SERVERURL } from '../utils/index.utils';

export const Profile = ({ route }) => {
  const { user, logout } = useUser();
  const [communitiesJoined, setCommunitiesJoined] = useState([]);
  // const {id} = route.params

  // console.log(user);

  useEffect(() => {
    fetchCommunitiesJoined();
  }, []);

  const fetchCommunitiesJoined = async () => {
    try {
      const res = await fetch(`${SERVERURL}/communities/${user.id}`);
      const communityMember = await res.json();
      console.log('commember', communityMember);
      setCommunitiesJoined(communityMember);
    } catch (error) {
      console.log(error);
    }
  };

  const communitiesIdUsersIn = communitiesJoined.map(
    (community) => community.communityId
  );
  console.log(communitiesIdUsersIn);
  //fetch user data
  return (
    <SafeAreaView>
      <View>
        <View style={styles.userImg}>
          <Text style={styles.username}>{user.username.charAt(0)}</Text>
        </View>
        <Text style={styles.greeting}>Hello, {user.username}</Text>
      </View>
      <Text>Inbox</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 20,
  },
  userImg: {},
});
