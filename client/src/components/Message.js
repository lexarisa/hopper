import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import dayjs from "dayjs";

let advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

export default function Message({ item, user }) {
  const image = {
    uri: `https://gradient-avatar.glitch.me/${item.userId}?size=45`,
  };

  const styles = StyleSheet.create({
    message: {
      flexDirection: item.userId === user.id ? "row-reverse" : "row",
      alignItems: "center",
      marginVertical: 15,
      marginHorizontal: 5,
    },
    imageSpacing: {
      marginRight: item.userId === user.id ? 0 : 8,
      marginLeft: item.userId === user.id ? 8 : 0,
    },
    messageBox: {
      textAlign: item.userId === user.id ? "right" : "left",
      padding: 10,
      width: 250,
      color: "white",
      backgroundColor: "#F9FBFC",
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOpacity: 0.25,
      shadowRadius: 1,
      shadowOffset: {
        height: 0.5,
        width: 1,
      },
    },
    image: {
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      height: 45,
      width: 45,
      borderRadius: 35,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    userDetail: {
      flexDirection: "column",
    },
    date: {
      fontSize: 9,
      color: "#1C2126",
      marginLeft: 5,
      marginTop: 4,
    },
    username: {
      fontWeight: "bold",
      marginLeft: 5,
    },
    text: {
      marginTop: 4,
      marginLeft: 5,
    },
    userInitial: {
      color: "white",
      fontWeight: "bold",
    },
  });

  console.log(styles.imageSpacing);

  return (
    <View style={styles.message}>
      <View style={styles.imageSpacing}>
        <ImageBackground
          source={image}
          style={styles.image}
          imageStyle={{ borderRadius: 35 }}
        >
          <Text style={styles.userInitial}>{item.username.charAt(0)}</Text>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.messageBox}>
          <View style={styles.userDetail}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.date}>
              {dayjs(item.createdAt).format(`HH:mm A: - MMM Do, YYYY`)}
            </Text>
          </View>
          <Text style={styles.text}>{item.content}</Text>
        </View>
      </View>
    </View>
  );
}
