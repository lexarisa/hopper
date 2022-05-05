import { View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

export const CustomInput = ({
  value,
  errors, 
  setValue,
  placeholder,
  secureTextEntry,
}) => {
    const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 15,
      marginBottom: errors && errors[placeholder.toLowerCase()] ? 0 : 16,
    },
  
    errors : {
      color: "red",
      textAlign: 'left',
      paddingLeft: 12,
      marginTop:4,
      marginBottom: 16,
      width: '100%'
    }
  });
  

  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          secureTextEntry={secureTextEntry}
        />
      </View>
      <Text style={styles.errors}>{errors ? errors[placeholder.toLowerCase()]: ''}</Text>
    </>
  );
};

