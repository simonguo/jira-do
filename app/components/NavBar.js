
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback
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
            style={[styles.icon]}
            onPress={onLeftIconPress}
          />
        ) : <View style={[styles.icon]}></View>}
        <Text style={styles.titleText}>{title}</Text>
        {rightIcon ? (
          <Icon
            name={rightIcon}
            style={[styles.icon]}
            onPress={onRightIconPress}
          />
        ) : <View style={[styles.icon]}></View>}
      </View>
    );
  }
}

export default NavBar;