import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const CustomCard = ({
  price,
  description,
  colorHex,
  fontColor,
  descriptionColor,
  width,
}) => {
  const cardColor = {
    backgroundColor: colorHex,
  };
  const textColor = {
    color: fontColor,
  };
  const descriptionText = {
    color: descriptionColor,
  };
  const cardWidth = {
    width: width,
  };

  return (
    <View style={[styles.card, cardColor, cardWidth]}>
      <View>
        <Text style={[styles.description, descriptionText]}>{description}</Text>
        <Text style={[styles.price, textColor]}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,

    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 1,
    },
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  description: {
    fontSize: 10,
    marginBottom: 2,
    color: 'grey',
  },
});
