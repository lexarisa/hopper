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
        <View style={[styles.returnBtn]}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.joinText}>Cancel</Text>
          </Pressable>
        </View>
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
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 1,
    },
  },
  returnBtn: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  joinText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  pressable: {
    marginLeft: 7,
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    marginTop: 15,
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
