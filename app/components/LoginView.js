
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
  AsyncStorage
} from 'react-native';
import _ from 'lodash';

import styles from '../styles/LoginView.style';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.state = {
      data: {
        server: null,
        username: null,
        password: null
      }
    }
  }
  handleFormChange(key, value) {
    let nextData = Object.assign({}, this.state.data, {
      [key]: value
    });
    this.setState({
      data: nextData
    });
  }
  handleLogin() {
    const { onLoginSubmit } = this.props;
    const { data } = this.state;
    if (!data.server) {
      AlertIOS.alert('Message', 'You must enter the base domain for your JIRA server');
    } else if (!data.username || !data.password) {
      AlertIOS.alert('Message', 'Incorrect username or password.');
    }
    onLoginSubmit && onLoginSubmit(data);
  }
  renderForm() {
    const { session } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.logoText} >JIRA</Text>
        <Image source={require('../resources/logo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder='https://jira.company.com'
          numberOfLines={1}
          autoFocus={true}
          onChangeText={(server) => this.handleFormChange('server', server)}
          underlineColorAndroid={'transparent'}
          textAlign='center'
        />

        <TextInput
          style={styles.input}
          placeholder='Username'
          numberOfLines={1}
          autoFocus={true}
          onChangeText={(username) => this.handleFormChange('username', username)}
          underlineColorAndroid={'transparent'}
          textAlign='center'
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          numberOfLines={1}
          autoFocus={true}
          onChangeText={(password) => this.handleFormChange('password', password)}
          underlineColorAndroid={'transparent'}
          secureTextEntry={true}
          textAlign='center'
        />

        <TouchableWithoutFeedback
          onPress={() => {
            if (session.status === 'REQUEST') {
              return;
            }
            this.handleLogin()
          }}
        >
          <View
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {session.status === 'REQUEST' ? 'Loading...' : 'Sign in'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  renderLoading() {
    return (
      <View style={styles.container}>
        <Text style={styles.logoText} >JIRA</Text>
        <Image source={require('../resources/logo.png')} style={styles.logo} />
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }
  render() {
    const { session } = this.props;
    if (session.status === 'REQUEST') {
      return this.renderLoading();
    }
    return this.renderForm();
  }
};

LoginView.propTypes = {
  session: React.PropTypes.object,
  onLoginSubmit: React.PropTypes.func
}

export default LoginView

