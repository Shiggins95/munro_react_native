import React from 'react';
import {
  View, Text, Button, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const mountainMarker = require('../../assets/AdobeStock_139523686.png');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
    height: 400,
    width: '100%',
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  markerContainer: {
    backgroundColor: 'rgba(238,238,238,0.5)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
});
export default function Map({ munro }) {
  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return { errorMessage: 'There were some errors' };
    }

    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    const { latitude, longitude } = location.coords;
    console.log(location.coords);
    // setState({ ...state, currentLocation:  });
    return { latitude, longitude };
  };
  console.log('munro', munro);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          longitude: munro.longitude,
          latitude: munro.latitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.15,
        }}
      >
        <Marker
          key={munro.longitude}
          coordinate={{
            longitude: munro.longitude,
            latitude: munro.latitude,
          }}
          title={munro.name}
          description={munro.description}
        >
          <View style={styles.markerContainer}>
            <Text style={{ paddingRight: 30 }}>{munro.name}</Text>
            <Image source={mountainMarker} style={styles.marker} />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

Map.propTypes = {
  munro: PropTypes.object.isRequired,
};
