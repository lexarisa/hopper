import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import React from 'react';

export const CustomButton = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#3B71F3',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
