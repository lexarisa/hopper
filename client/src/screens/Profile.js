import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useUser } from '../context/UserContext';

export const Profile = () => {
  const { user, logout } = useUser();
  //fetch user data
  return (
    <SafeAreaView>
      <View>
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
});
