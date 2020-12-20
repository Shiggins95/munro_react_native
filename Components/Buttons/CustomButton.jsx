import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const CustomButton = ({
  onPress, title, buttonStyle, textStyle,
}) => (
  <TouchableOpacity onPress={onPress} style={buttonStyle}>
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

CustomButton.defaultProps = {
  buttonStyle: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ddd',
    margin: 10,
  },
  textStyle: {},
};

export default CustomButton;
