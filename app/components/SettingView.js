
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  AlertIOS,
  ScrollView,
  Linking,
  AsyncStorage
} from 'react-native';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/SettingView.style';

class SettingView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { userConfig } = this.props;
    let { displayName, avatarUrl, name } = userConfig;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleBar}>
          <Icon
            name='ios-arrow-back'
            style={styles.backIcon}
            onPress={this.props.goBack}
          />
          <Text style={styles.titleText}>Settings</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: avatarUrl ? avatarUrl.replace('xsmall', 'xlarge') : undefined }} />
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
        >

          <TouchableWithoutFeedback
            onPress={() => {
              console.log('TouchableWithoutFeedback')
              this.props.onLogoutSubmit()
            }}
          >
            <View style={styles.item}>
              <Text style={[styles.itemText, { color: 'red' }]}>Sign out</Text>
            </View>
          </TouchableWithoutFeedback>

        </ScrollView>
      </View>
    )
  }
};

SettingView.propTypes = {
  goBack: React.PropTypes.func,
  onLogoutSubmit: React.PropTypes.func
}

export default SettingView

