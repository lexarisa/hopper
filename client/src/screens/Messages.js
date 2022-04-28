import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import io from 'socket.io-client';
import { FlatList } from 'react-native-gesture-handler';
import { useUser } from '../context/UserContext';
import { SERVERURL } from '../utils/index.utils';
import { HOST } from '@env';
import dayjs from 'dayjs';
import { Feather } from '@expo/vector-icons';
console.log(HOST)

let advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const socket = io(`http://${HOST}:3002`);

export const Messages = ({ route }) => {
  const [singleMessage, setSingleMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [notification, setNotification] = useState('');
  const { user } = useUser();
  const { item } = route.params; //string

  useEffect(() => {
    fetchMessages();
    socket.emit('joinRoom', item.id, (message) => {
      setNotification(message);
    });
    socket.on('receive-message', (msg) => {
      setChatMessages((prevMsg) => [...prevMsg, msg]);
    });
    //cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  const addUserToCommunity = async (user) => {
    try {
      const res = await fetch(`${SERVERURL}/communities`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMessages = async () => {
    try {
      fetch(`${SERVERURL}/messages/${item.id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Something went wrong');
          return res.json();
        })
        .then((data) => {
          setChatMessages(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const postMessage = async (msg) => {
    try {
      fetch(`${SERVERURL}/messages`, {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        if (!res.ok) throw Error('Something went wrong');
        return res.json();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitMessage = useCallback(() => {
    let textNotEmpty = singleMessage.trim().length > 0;

    if (textNotEmpty) {
      const messageModel = {
        userId: user.id,
        username: user.username,
        content: singleMessage,
        communityId: item.id,
        createdAt: new Date(),
      };
      socket.emit('sendMessage', messageModel, item.id);
      setChatMessages((prevMsg) => [...prevMsg, messageModel]); //not rerendering
      postMessage(messageModel);
      addUserToCommunity({ userId: user.id, communityId: item.id });
      setSingleMessage('');
    } else {
      console.log('text empty');
    }
  }, [singleMessage]);

  // const fetchMessagesDetail = async () => {
  //   console.log('fetchMessagesDetail()');
  //   try {
  //     await Promise.all([
  //       fetch(`${SERVERURL}/messages/${item.id}`),
  //       fetch(`${SERVERURL}/users/${user.id}`),
  //     ])
  //       .then((responses) => {
  //         return Promise.all(
  //           responses.map((response) => {
  //             return response.json();
  //           })
  //         );
  //       })
  //       .then((data) => {
  //         setMessageDetail(data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // console.log('messageDetail', messageDetail);
  // const combineMessageWithUser = () => {
  //   if (messageDetail.length > 0) {
  //     const newArray = messageDetail[0].map((item) => {
  //       if (item.userId === messageDetail[1]._id) {
  //         return {
  //           userId: item.userId,
  //           username: messageDetail[1].username,
  //           email: messageDetail[1].email,
  //           content: item.content,
  //           communityId: item.communityId,
  //         };
  //       } else {
  //         return item;
  //       }
  //     });

  //     return newArray;
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        {chatMessages && (
          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.chatLog}>
                <View style={styles.left}>
                  <View style={styles.image}>
                    {item.username && (
                      <Text style={styles.userInitial}>
                        {item.username.charAt(0)}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.right}>
                  <View style={styles.messageBox}>
                    <View style={styles.userDetail}>
                      <Text style={styles.username}>{item.username}</Text>
                      <Text style={styles.date}>
                        {dayjs(item.createdAt).format(
                          `HH:mm A: - MMM Do, YYYY`
                        )}
                      </Text>
                    </View>
                    <Text style={styles.message}>{item.content}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <View>
        <TextInput
          style={styles.input}
          value={singleMessage}
          onSubmitEditing={() => handleSubmitMessage()}
          onChangeText={(msg) => setSingleMessage(msg)}
          placeholder="Write a message"
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatLog: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  left: {
    marginRight: 5,
  },
  container: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  chat: {
    flex: 1,
    marginHorizontal: 10,
  },
  messageBox: {
    padding: 15,
    width: 280,
    marginVertical: 8,
    color: 'white',
    backgroundColor: '#F9FBFC',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 1,
    },
  },
  input: {
    backgroundColor: '#E8E8E8',
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    height: 50,
  },

  text: {},
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 45,
    width: 45,
    backgroundColor: '#4A56E2',
    borderRadius: 15,
    marginBottom: 10,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },

    elevation: 2,
  },
  userDetail: {
    flexDirection: 'column',
  },
  date: {
    fontSize: 9,
    color: '#1C2126',
    marginLeft: 5,
    marginTop: 4,
  },
  username: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  message: {
    marginVertical: 10,
    marginLeft: 5,
  },
  userInitial: {
    color: 'white',
    fontWeight: 'bold',
  },
});

//emit to get all msgs
