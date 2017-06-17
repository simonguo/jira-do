
import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/NavBar.style';

class NavBar extends Component {

  render() {
    const {
      leftIcon,
      onLeftIconPress,
      rightIcon,
      onRightIconPress,
      title
    } = this.props;

    return (
      <View style={styles.titleBar}>
        {leftIcon ? (
          <Icon
            name={leftIcon}
            style={[styles.icon, styles.leftIcon]}
            onPress={onLeftIconPress}
          />
        ) : null}
        <Text style={styles.titleText}>{title}</Text>
        {rightIcon ? (
          <Icon
            name={rightIcon}
            style={[styles.icon, styles.rightIcon]}
            onPress={onRightIconPress}
          />
        ) : null}
      </View>
    );
  }
}

export default NavBar;