import React, { useEffect } from 'react';
import {
  SafeAreaView, View, Text, Button, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { _setMunros } from '../../Redux/Actions';
import CustomButton from '../../Components/Buttons/CustomButton';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ddd',
    margin: 10,
  },
});

export default function HomeScreen({ navigation }) {
  const { munros, loaded } = useSelector((state) => state.munros);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMunroData = async () => {
      const response = await fetch('https://munroapi.herokuapp.com/munros');
      const munroData = await response.json();
      console.log('munroData', munroData[0]);
      const regions = {};
      const munrosFetched = [];
      munroData.forEach((munro, index) => {
        const munroObject = {
          latitude: munro.latlng_lat,
          longitude: munro.latlng_lng,
          name: munro.name,
          description: munro.meaning,
          id: index,
        };
        munrosFetched.push(munroObject);
        if (regions[munro.region]) {
          regions[munro.region].push(munroObject);
        } else {
          regions[munro.region] = [munroObject];
        }
      });
      dispatch(_setMunros({ munros: munrosFetched, regions }));
    };
    getMunroData();
  }, []);
  return (
    <SafeAreaView>
      {loaded ? (
        <View style={styles.container}>
          <CustomButton
            title="All Munros"
            onPress={() => navigation.navigate('Munros', { prevRoute: 'Home', munros })}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            color="red"
            accessibilityLabel="View a list of all Munros"
          />
          <CustomButton
            title="Munros By Region"
            onPress={() => navigation.navigate('MunrosRegions', { prevRoute: 'Home', munros })}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            color="red"
            accessibilityLabel="View a list of all Munros filterable by region"
          />
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
