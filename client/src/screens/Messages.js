import { View, TextInput, StyleSheet } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import io from "socket.io-client";
import { FlatList } from "react-native-gesture-handler";
import { useUser } from "../context/UserContext";
import { SERVERURL } from "../utils/index.utils";
import { HOST, PORT } from "@env"; //
import Message from './../components/Message';

const socket = io(`http://${HOST}:${PORT}`); 

export const Messages = ({ route }) => {
  const [singleMessage, setSingleMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [notification, setNotification] = useState("");
  const { user } = useUser();
  const { item } = route.params; //string

  useEffect(() => {
    socket.emit("joinRoom", item.id, (response) => {
      if (response.ok) {
        setChatMessages(response.data);
      } else {
        console.log("response", response.errors);
      }
    });

    socket.on("receive-message", (response) => {
      if (response.ok) {
        setChatMessages((prevMsg) => {
          return [...prevMsg, ...response.data];
        });
      } else {
        // handle errors: response.errors
      }
    });

    //cleanup
    return () => {
      socket.disconnect();
      setChatMessages({});
    };
  }, []);

  const addUserToCommunity = async (user) => {
    try {
      const res = await fetch(`${SERVERURL}/communities`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
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
          if (!res.ok) throw new Error("Something went wrong");
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
        method: "POST",
        body: JSON.stringify(msg),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) throw Error("Something went wrong");
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
      socket.emit("sendMessage", messageModel, item.id);
      addUserToCommunity({ userId: user.id, communityId: item.id });
      setSingleMessage("");
    } else {
      console.log("text empty");
    }
  }, [singleMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        {chatMessages && (
          <FlatList
            inverted
            data={[...chatMessages].reverse()}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <Message
                item={item}
                user={user}
              />
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
  
  container: {
    marginHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
  },
  chat: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: "#E8E8E8",
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    height: 50,
  }, 
});