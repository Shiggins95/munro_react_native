import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from './Views/Navigation/NavBar';
import HomeScreen from './Views/HomeScreen/HomeScreen';
import Munros from './Views/Munros/Munros';

const Stack = createStackNavigator();

export default function App() {
  const getHeaderOptions = (navigation, route) => ({
    headerTitle: (props) => <NavBar {...props} navigation={navigation} route={route} />,
    headerStyle: {
      backgroundColor: '#bbb',
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ navigation, route }) => getHeaderOptions(navigation, route)}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Munros" component={Munros} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
