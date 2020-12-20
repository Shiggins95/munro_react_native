import React, { useState } from 'react';
import {
  View, StyleSheet, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { setHeaderOptions } from '../../Helpers/SetHeaderOptions';
import PickerModal from '../../Components/Modals/PickerModal';
import Map from '../../Components/Map/Map';

export default function Munros({ navigation, route }) {
  setHeaderOptions({ navigation, route });
  const { munros } = useSelector((state) => state.munros);
  const [selectedValue, setSelectedValue] = useState(false);
  const startingState = { munros: false, regions: false };
  const [pickerState, setPickerState] = useState(startingState);
  const handleClose = () => {
    setPickerState(startingState);
  };
  const handleSelect = (value) => {
    const selected = munros.filter((munro) => munro.id === value)[0] || {};
    setSelectedValue(selected);
    setPickerState(startingState);
  };
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Button onPress={() => setPickerState({ ...startingState, munros: true })} title="Munros" />
      {selectedValue ? <Map munro={selectedValue} /> : null }
      <PickerModal
        onClose={handleClose}
        visible={pickerState.munros}
        title="Munros"
        onSelect={handleSelect}
        items={munros}
        searchable
      />
    </View>
  );
}
Munros.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
