import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useUser } from '../context/UserContext';

export const Profile = () => {
  const { user, logout } = useUser();
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
