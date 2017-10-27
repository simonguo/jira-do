
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Platform
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/SettingView.style';
import { Actions } from 'react-native-router-flux';
import NavBar from './NavBar';
import Avatar from './Avatar';
import { Line, Row } from './common/List';
import { FlexView } from './common/Layout';

class SettingView extends Component {

  render() {
    console.log('render Setting');
    const { userConfig = {} } = this.props;
    let { displayName, avatarUrls, name } = userConfig || {};
    const { settings, signOut } = this.context.intl.messages;

    return (
      <FlexView>
        <NavBar
          title={settings}
          leftIcon='ios-close-outline'
          onLeftIconPress={() => Actions.pop()}
        />
        <View style={styles.user}>
          <Avatar
            style={styles.avatar}
            uri={avatarUrls && avatarUrls['48x48']}
            width={36}
            height={36}
          />
          <View style={styles.username}>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
      </FlexView>
    );

    // return (
    //   <View style={{
    //     flex: 1
    //   }}>

        // <NavBar
        //   title={settings}
        //   leftIcon='ios-close-outline'
        //   onLeftIconPress={() => Actions.pop()}
        // />

    //     <View style={styles.avatarContainer}>
    //       <Avatar
            // style={styles.avatar}
            // uri={avatarUrls && avatarUrls['48x48']}
            // width={48}
            // height={48}
    //       />
          // <Text style={styles.displayName}>{displayName}</Text>
          // <Text style={styles.name}>{name}</Text>
    //     </View>
    //     <ScrollView
    //       style={styles.scrollView}
    //     >
    //       <View style={styles.item}>
    //         <Text style={[styles.itemText]}>Version 1.3</Text>
    //       </View>
    //       <TouchableWithoutFeedback
    //         onPress={() => {
    //           this.props.onLogoutSubmit();
    //         }}
    //       >
    //         <View style={styles.item}>
    //           <Text style={[styles.itemText, { color: 'red' }]}>{signOut}</Text>
    //         </View>
    //       </TouchableWithoutFeedback>

    //     </ScrollView>
    //   </View>
    // )
  }
};

SettingView.propTypes = {
  userConfig: PropTypes.object,
  onLogoutSubmit: PropTypes.func
}

SettingView.contextTypes = {
  intl: PropTypes.object.isRequired
}

export default SettingView
