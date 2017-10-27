import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet
} from 'react-native';

export const FlexView = ({children, style}) => {
  console.log(style);
  return (
    <View style={[{
      flex: 1
    }, StyleSheet.flatten(style)]}>
      {children}
    </View>
  );
};

