import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export const Profile = () => {
  //fetch user data
  return (
    <SafeAreaView>
      <View>
        <Text>Hello, User</Text>
      </View>
      <Text>Inbox</Text>
      {/* <View>
        {chatMessages.map((chatMessage) => (
          <Text style={styles.text} key={chatMessage.id}>
            {chatMessage.message}
          </Text>
        ))}
      </View> */}
    </SafeAreaView>
  );
};
