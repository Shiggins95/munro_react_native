import React from 'react';
import { Button } from 'react-native';

export const setMapOptions = ({ navigation, route }) => {
// const [counter, setCounter] = useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={() => navigation.navigate(route.params.prevRoute)} title="Back" />,
    });
  });
};
