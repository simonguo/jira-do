import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet
} from 'react-native';

import styles from './style';

export const FlexView = ({children, style}) => {
  return (
    <View style={[{
      flex: 1
    }, style]}>
      {children}
    </View>
  );
};

export const Grid = ({col, children, style}) => {
  return (
    <View style={styles['col-' + col]} >
      {children}
    </View>
  );
};

export const PaddingHorizontal = ({paddingHorizontal, children, backgroundColor}) => {
  const style = styles['paddingHorizontal' + paddingHorizontal] || {
    width: paddingHorizontal
  };
  return (
    <View style={styles.row}>
      <View style={[style, {
        backgroundColor
      }]}></View>
      { children }
      <View style={[style, {
        backgroundColor
      }]}></View>
    </View>
  );
}
