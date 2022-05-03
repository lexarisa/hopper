import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export const CustomButton = ({ role, text, onPress }) => {
  return (
    <TouchableOpacity accessibilityRole={'button'} onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 16,

    backgroundColor: '#24CCA7',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
