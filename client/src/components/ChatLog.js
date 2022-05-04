import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchImages, fetchMessages } from '../services/fetchService';
import { imageParser } from '../utils/index.utils.tsx';


export const ChatLog = ({ country, city, id }) => {
  const [lastMessage, setLastMessage] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    getLastMessage()
    .then(()=> {
      fetchImages(city)
      .then(
        (images) => {
          setImages(images);
        }
      );
    });
    return () => {
      setImages([]);
      setLastMessage('');
    }
  }, []);

  const getLastMessage = async () => {
    const messages = await fetchMessages(id);
    setLastMessage(messages[0].content);
  };

  return (
    <View style={styles.content}>
      <View>
        {images.length > 1 && (
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: images[2].image }}
          />
        )}
      </View>
      <View>
        <Text style={styles.text}>
          {city}, {country}
        </Text>
        <Text style={styles.lastMessage}>{lastMessage || ''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 25,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#F9FBFC',
    borderRadius: 20,
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
  lastMessage: {
    color: '#909090',
    marginTop: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 15,
  },
});
