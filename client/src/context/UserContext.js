import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(loginInfo) {
    console.log({ loginInfo });
    fetch('http://localhost:3002/users/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        console.log('res', res);
        if (!res.ok) throw new Error('Something went wrong');

        res.json().then((loginuser) => {
          console.log('useronLogin', loginuser);
          setUser(loginuser);
        });
      })
      .catch((e) => console.log(e));
  }

  async function createUser(user) {
    console.log(user, 'hello');

    try {
      const res = await fetch('http://localhost:3002/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      });

      const newUser = await res.json();
      console.log('user', newUser);
      setUser(newUser);
    } catch (error) {
      console.log(error);
    }

    // fetch('http://localhost:3002/users', {
    //   method: 'POST',
    //   body: JSON.stringify(user),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    // .then(async (res) => {
    //   console.log('response', res);
    //   // if (!res.ok) throw new Error('Something went wrong');
    //   return await res.json();
    // })
    // .then((user) => {
    //   setUser(user);
    //   console.log('userrr', user);
    // })
    // .catch((e) => console.log(e));
  }

  // const _storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     const value = await AsyncStorage.setItem()
  //   } catch (error) {

  //   }
  // }
  const value = { login, createUser, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
