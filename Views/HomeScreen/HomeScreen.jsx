import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, Button,
} from 'react-native';
import PropTypes from 'prop-types';

export default function HomeScreen({ navigation }) {
  const [{ munros, loaded }, setState] = useState({
    munros: [],
    loaded: false,
  });
  useEffect(() => {
    const getMunroData = async () => {
      const response = await fetch('https://munroapi.herokuapp.com/munros');
      const munroData = await response.json();
      console.log('munroData', munroData[0]);
      const regions = {};
      const munrosFetched = [];
      munroData.forEach((munro, index) => {
        munrosFetched.push({
          latitude: munro.latlng_lat,
          longitude: munro.latlng_lng,
          name: munro.name,
          description: munro.meaning,
          id: index,
        });
        if (regions[munro.region]) {
          regions[munro.region].push(munro);
        } else {
          regions[munro.region] = [munro];
        }
      });
      setState({
        munros: munrosFetched, loaded: true,
      });
    };
    getMunroData();
  }, []);
  return (
    <SafeAreaView>
      {loaded ? (
        <View>
          <Text>Hello World</Text>
          <Button title="Go To Map" onPress={() => navigation.navigate('Munros', { prevRoute: 'Home', munros })} />
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}

    </SafeAreaView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
