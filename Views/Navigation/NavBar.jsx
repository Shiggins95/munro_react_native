import React from 'react';
import {
  Text, View,
} from 'react-native';

export default function NavBar({ route }) {
  const { name } = route;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
