import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
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
    await createUser({ username, email, password });
  };
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  pressable: {
    marginLeft: 7,
  },
});
