import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { FlexView } from './Layout';

import styles from '../../styles/Button.style';

export const FabAddButton = ({onPress}) => {
  return (
    <TouchableHighlight
      style={styles.addButton}
      onPress={onPress}
      underlayColor='#0084d2'
    >
      <Icon
        name="md-add"
        style={styles.add}
        borderRadius={24}
      />
    </TouchableHighlight>
  );
};

export const ButtonPrime = ({onPress, title}) => {
  return (
    <FlexView style={styles.buttonWrap}>
      <TouchableHighlight
        style={styles.button}
        onPress={onPress}
        underlayColor='#0084d2'
      >
        <Text style={styles.buttonTitle}>
          {title}
        </Text>
      </TouchableHighlight>
    </FlexView>

  );
}

