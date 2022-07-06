import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
});
