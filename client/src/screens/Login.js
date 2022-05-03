import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';

import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useUser } from '../context/UserContext';

export const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { login } = useUser();

  const handleLogin = async () => {
    const res = await login({ username, password });
    if (!res.ok) {
      setErrors(res.errors);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/hopperLogo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text style={styles.appName}>Hopper</Text>
          <Text style={styles.appTagline}>
            Discover your new remote working location
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.root}>
          <Text style={styles.header}>Login</Text>
          <CustomInput
            placeholder="Username"
            value={username}
            errors={errors}
            setValue={setUsername}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            errors={errors}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomButton role="" text="Log in" onPress={() => handleLogin()} />

          <Text style={styles.text}>
            Don't have an account?
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.pressable}> Register</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
  },
  container: {
    backgroundColor: '#24CCA7',
    borderBottomEndRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 30,
    height: '50%',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 1,
    },
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  header: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
  pressable: {
    marginLeft: 7,
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 35,
    color: '#1C2126',
  },
  appTagline: {
    color: '#444',
    marginTop: 10,
  },
});

const { height } = Dimensions.get('screen');
const logoHeight = height * 0.28;
