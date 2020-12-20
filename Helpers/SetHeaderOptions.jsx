import React from 'react';
import { Button } from 'react-native';

export const setHeaderOptions = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={() => navigation.navigate(route.params.prevRoute)} title="Back" />,
    });
  });
};
