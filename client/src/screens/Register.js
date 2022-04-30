import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';

export const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { createUser } = useUser();

  const handleRegister = async () => {
    const res = await createUser({ username, email, password });
    if (!res.ok){
      console.log(res.error)
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
      <View style={styles.root}>
        <Text style={styles.header}>Register</Text>
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Register" onPress={() => handleRegister()} />
        <Text style={styles.text}>
          Already have an account?
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.pressable}>Login</Text>
          </Pressable>
        </Text>
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
