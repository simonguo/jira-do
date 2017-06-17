
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/SettingView.style';
import { Actions } from 'react-native-router-flux';
import NavBar from './NavBar';

class SettingView extends Component {

  render() {
    const { userConfig = {} } = this.props;
    let { displayName, avatarUrl, name } = userConfig;
    const { settings, signOut } = this.context.intl.messages;
    return (
      <View style={{ flex: 1 }}>

        <NavBar
          title={settings}
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />

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
          <View style={styles.item}>
            <Text style={[styles.itemText]}>Version 1.3</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.onLogoutSubmit();
            }}
          >
            <View style={styles.item}>
              <Text style={[styles.itemText, { color: 'red' }]}>{signOut}</Text>
            </View>
          </TouchableWithoutFeedback>

        </ScrollView>
      </View>
    )
  }
};

SettingView.propTypes = {
  userConfig: React.PropTypes.object,
  onLogoutSubmit: React.PropTypes.func
}

LoginView.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default SettingView
