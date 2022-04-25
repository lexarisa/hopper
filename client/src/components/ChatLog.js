import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SERVERURL } from '../utils/index.utils';

export const ChatLog = ({ country, city, id }) => {
  const [chatPreview, setChatPreview] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      fetch(`${SERVERURL}/messages/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Something went wrong');
          return res.json();
        })
        .then((data) => {
          setChatPreview(data.slice(0, 1));
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.text}>
        {city}, {country}
      </Text>
      {chatPreview.length >= 1 && (
        <Text style={styles.chatPreview}>{chatPreview[0].content}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 25,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#F9FBFC',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 1,
    },
  },
  text: {
    fontWeight: 'bold',
  },
});
