import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';

import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useUser } from '../context/UserContext';

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();

  const handleLogin = async () => {
    // if (username === '' && password.length < 6) {
    //   setError('Please provide valid credentials');
    // }
    console.log('handleLogin()r');
    await login({ username, password });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/hopperLogo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.root}>
          <Text style={styles.header}>Login</Text>
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomButton text="Login" onPress={() => handleLogin()} />

          <Text style={styles.text}>
            Don't have an account?
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.pressable}> Register</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FBFC',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pressable: {
    marginLeft: 7,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

const { height } = Dimensions.get('screen');
const logoHeight = height * 0.28;
