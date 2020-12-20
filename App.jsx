import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import NavBar from './Views/Navigation/NavBar';
import HomeScreen from './Views/HomeScreen/HomeScreen';
import Munros from './Views/Munros/Munros';
import reducers from './Redux/Reducers/index';
import MunrosRegions from './Views/Munros/MunrosByRegions';

const Stack = createStackNavigator();

const store = createStore(reducers);

export default function App() {
  const getHeaderOptions = (navigation, route) => ({
    headerTitle: (props) => <NavBar {...props} navigation={navigation} route={route} />,
    headerStyle: {
      backgroundColor: '#bbb',
    },
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={({ navigation, route }) => getHeaderOptions(navigation, route)}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Munros" component={Munros} />
          <Stack.Screen name="MunrosRegions" component={MunrosRegions} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
