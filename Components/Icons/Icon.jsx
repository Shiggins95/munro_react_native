import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-web';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Icon = ({
  name, color, size, onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesome5 name={name} size={size} color={color} />
  </TouchableOpacity>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

Icon.defaultProps = {
  color: 'black',
  onPress: () => {},
};

export default Icon;
