import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST } from '@env';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login(loginInfo) {
    try {
      const res = await fetch(`http://${HOST}:3002/users/login`, {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'Content-Type': 'application/json' },
      });
      const loginUser = await res.json();

      setUser(loginUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function createUser(user) {
    try {
      const res = await fetch(`http://${HOST}:3002/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      });

      const newUser = await res.json();

      setUser(newUser);

      storeData(newUser);
      setIsLoggedIn(true);
    } catch (error) {
      // display error on ui
      console.log(error);
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const storeData = async (user) => {
    try {
      const key = JSON.stringify(user.id);
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (user) => {
    try {
      const key = JSON.stringify(user.id);
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
    }
  };
  const value = { login, logout, createUser, setUser, user, isLoggedIn };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
