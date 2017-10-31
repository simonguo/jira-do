import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { FlexView } from '../Layout';

import styles from './style';

export const Row = ({label, children, style}) => {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.label}>{label}</Text>
      <View>
        {children}
      </View>
    </View>
  );
};

export const RowWithArrow = ({label, children, onPress, color}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.wrap}
      underlayColor='#eee'
    >
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.rowRight}>
          {children}
          <Icon
            name="ios-arrow-forward"
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export const Header = ({text, children}) => {
  return (
    <Text style={styles.header}>
      {text}
    </Text>
  );
};

export const Line = ({style}) => {
  return (
    <View style={[styles.line, style]}></View>
  );
};

export const SectionHeader = ({text, children}) => {
  return (
    <Text style={styles.sectionHeader}>
      {text}
    </Text>
  );
};


