import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import CustomButton from '../../Components/Buttons/CustomButton';
import Map from '../../Components/Map/Map';
import PickerModal from '../../Components/Modals/PickerModal';
import { setHeaderOptions } from '../../Helpers/SetHeaderOptions';

const styles = StyleSheet.create({
  buttonStyle: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ddd',
    margin: 10,
  },
});
const MunrosRegions = ({ navigation, route }) => {
  const { regions, munros } = useSelector((state) => state.munros);
  setHeaderOptions({ navigation, route });
  const [selectedValues, setSelectedValues] = useState([]);
  const startingState = { munros: false, regions: false };
  const [pickerState, setPickerState] = useState(startingState);
  const handleClose = () => {
    setPickerState(startingState);
  };
  const handleSelect = (value) => {
    const selected = regions[value];
    setSelectedValues(selected);
    setPickerState(startingState);
  };
  const regionOptions = [];
  Object.keys(regions).forEach((region) => {
    regionOptions.push({ id: region, name: region });
  });
  return (
    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
      <CustomButton
        onPress={() => setPickerState({ ...startingState, regions: true })}
        title="Select Region"
        buttonStyle={styles.buttonStyle}
      />
      {selectedValues.length > 0 ? <Map munros={selectedValues} /> : null }
      <PickerModal
        onClose={handleClose}
        visible={pickerState.regions}
        title="Munros"
        onSelect={handleSelect}
        items={regionOptions}
        searchable
      />
    </View>
  );
};

MunrosRegions.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default MunrosRegions;
