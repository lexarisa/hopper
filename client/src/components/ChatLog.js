import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../services/useFetch';
import { UNSPLASH_ACCESS_KEY } from '@env';
import { imageParser } from '../utils/index.utils';
import { HOST } from '@env';

export const ChatLog = ({ country, city, id }) => {
  const [chatPreview, setChatPreview] = useState('');
  const [images, setImages] = useState([]);
  const { fetchImages } = useFetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  console.log(id);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    fetchImages().then(
      (data) => {
        setImages(imageParser(data));
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  const fetchMessages = async () => {
    try {
      fetch(`http://${HOST}:3002/messages/${id}`)
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
      <View>
        {images.length > 1 && (
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: images[1].image }}
          />
        )}
      </View>
      <View>
        <Text style={styles.text}>
          {city}, {country}
        </Text>
        {chatPreview.length >= 1 && (
          <Text style={styles.chatPreview}>{chatPreview[0].content}</Text>
        )}
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
  chatPreview: {
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
