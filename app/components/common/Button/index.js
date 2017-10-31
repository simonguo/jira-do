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

import { FlexView } from '../Layout';

import styles from './style';

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

const underlayColor = {
  primary: '#0084d2',
  default: '#ccc'
};

export const ButtonBlock = ({onPress, title, type}) => {
  return (
    <FlexView style={styles.buttonWrap}>
      <View style={styles.paddingHorizontal15} />
      <TouchableHighlight
        style={[styles.button, styles[type]]}
        onPress={onPress}
        underlayColor={underlayColor[type]}
      >
        <Text style={[styles.buttonTitle, styles[type + 'Title']]}>
          {title}
        </Text>
      </TouchableHighlight>
      <View style={styles.paddingHorizontal15} />
    </FlexView>
  );
};


export class PopupMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      menus: [],
      x: 0,
      y: 0
    };
  }
  open({menus, e, id}) {
    const { locationX: x, locationY: y } = e.nativeEvent;
    this.setState({
      menus,
      e,
      x,
      y,
      id,
      show: true
    });
  }
  close = () => {
    this.setState({
      show: false
    });
  }
  render() {
    const {menus, show, id} = this.state;

    const children = menus.map(({title, onPress}) => (
      <TouchableHighlight
        onPress={() => onPress(id)}
      >
        <Text>{title}</Text>
      </TouchableHighlight>
    ));

    return (
      show ? (
        <Modal
          transparent={true}
        >
          <TouchableNativeFeedback
            onPress={this.close}
            style={styles.modal}
          >
          </TouchableNativeFeedback>
          <View style={styles.modalMenu}>
            {children}
          </View>
        </Modal>
      ) : null

    );
  }
} 

