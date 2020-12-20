import React, { useEffect, useState } from 'react';
import {
  Modal, View, StyleSheet, Picker, Text, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  pickerContainer: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 50,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    height: 50,
    alignItems: 'center',
    padding: 5,
  },
  textInput: {
    width: '100%',
    height: '100%',
    backgroundColor: '#bbbbbb',
    borderRadius: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
  },
  clearSearch: {
    position: 'absolute',
    right: 20,
  },
  title: {
    fontSize: 25,
    letterSpacing: 5,
    fontWeight: '400',
  },
});
const PickerModal = ({
  visible, title, onClose, onSelect, value, items, searchable,
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentItems, setCurrentItems] = useState(items);
  useEffect(() => {
    if (value) {
      setSelectedItem(value);
    } else {
      setSelectedItem(items[0].id);
    }
  }, []);
  const handleChangeText = (enteredValue) => {
    const newItems = items.filter((item) => item.name.toLowerCase().includes(enteredValue.toLowerCase()));
    if (newItems.length > 0) {
      setSelectedItem(newItems[0].id);
    }
    setCurrentItems(newItems);
    setSearchTerm(enteredValue);
  };
  const handleSelect = () => {
    setSearchTerm('');
    setCurrentItems(items);
    onSelect(selectedItem);
  };
  const handleClear = () => {
    setSearchTerm('');
    setCurrentItems(items);
  };
  return (
    <Modal animated transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={searchable ? { ...styles.pickerContainer, height: 350 } : styles.pickerContainer}>
          <View style={styles.header}>
            <Icon onPress={onClose} color="red" name="times-circle" size={25} />
            <Text style={styles.title}>{title}</Text>
            <Icon onPress={handleSelect} color="green" name="check-circle" size={25} />
          </View>
          {searchable ? (
            <View style={styles.searchBar}>
              <TextInput
                value={searchTerm}
                onChangeText={handleChangeText}
                style={styles.textInput}
              />
              <Icon
                name="search"
                size={15}
                onPress={() => {}}
                color="#eee"
                style={styles.searchIcon}
              />
              <Icon
                name="times"
                size={20}
                onPress={handleClear}
                color="red"
                style={styles.clearSearch}
              />
            </View>
          ) : null}
          <Picker selectedValue={selectedItem} onValueChange={(val) => setSelectedItem(val)}>
            {currentItems.map((item) => <Picker.Item key={item.id} value={item.id} label={item.name} />)}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

PickerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string,
};

PickerModal.defaultProps = {
  value: '',
};

export default PickerModal;
