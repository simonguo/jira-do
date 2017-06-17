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
        <Text style={styles.logoText} >JIRA</Text>
        <Image source={require('../resources/logo.png')} style={styles.logo} />
        <Spinner visible={loading} textStyle={{ color: '#FFF' }} />
        <StatusBar
          barStyle="light-content"
        />
      </View>
    );
  }
}


export default LoadingView;