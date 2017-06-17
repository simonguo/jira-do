import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../styles/LoadingView.style'

class LoadingView extends Component {

  render() {
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.logoText} >JIRA</Text>
        <Image source={require('../resources/logo.png')} style={styles.logo} />
        <Spinner visible={loading} />

      </View>
    );
  }
}


export default LoadingView;