import { View, ImageBackground, Text, Pressable, StyleSheet } from "react-native";
import { useUser } from "../context/UserContext";


export default function Header({navigation}) {
  const {isLoggedIn, user} = useUser();

  return (
    <View style={styles.header}>
      <ImageBackground style={styles.headerBg}>
        <View style={styles.headerContent}>
          {isLoggedIn ? (
            <View style={[styles.headerGreeting]}>
              <Text style={styles.joinText}>Hello, {user.username}</Text>
            </View>
          ) : (
            <View style={[styles.join, styles.headerGreeting]}>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.joinText}>Login</Text>
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
  )
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
    // paddingVertical: 20,
    // marginVertical: 20,
  },
  column: {
    marginHorizontal: 10,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    maxHeight: '60%',
  },
  header: {
    height: '20%',
  },
  join: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
  },
  headerGreeting: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tagline: {
    margin: 0,
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
    color: 'white',
  },
  headerBg: {
    height: '100%',
    width: '100%',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: '#4A56E2',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});