import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import DropdownAlert from 'react-native-dropdownalert';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/LoginView.style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/session';
import LoadingView from './LoadingView';

class LoginView extends PureComponent {
  constructor(props) {
    super(props);
    this.handleLoginCheck = this.handleLoginCheck.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);

    this.state = {
      data: {
        server: null,
        username: null,
        password: null
      }
    }
  }
  handleLoginCheck() {
    const { data } = this.state;
    const { message, loginCheckServer, loginCheckID } = this.context.intl.messages;

    if (!data.server) {
      this.handleAlert('warn', message, loginCheckServer)
      return;
    } else if (!data.username || !data.password) {
      this.handleAlert('warn', message, loginCheckID);
      return;
    }
    let server = data.server;
    if (/\/$/.test(server)) {
      server = server.substr(0, server.length - 1);
    }
    this.handleLoginSubmit({
      ...data,
      server: data.server.toLocaleLowerCase().indexOf('http') === -1 ? `https://${server}` : server
    });
  }

  handleLoginSubmit(data) {
    const { message, error, loginCheckID } = this.context.intl.messages;
    let { username } = this.state.data;
    this.props.onLogin(data, (resp) => {
      const auth = _.get(resp, ['session', 'value']);
      if (!auth) {
        this.handleAlert('warn', message, loginCheckID);
        return;
      }
      AsyncStorage.setItem('session', JSON.stringify(data));
      AsyncStorage.setItem('username', username);
      Actions.home();
    }, (e) => {
      this.handleAlert('error', error, e.toString());
    });
  }

  handleAlert(type, title, message) {
    this.alert.alertWithType(type, title, message);
  }

  handleFormChange(key, value) {
    let nextData = Object.assign({}, this.state.data, {
      [key]: value
    });
    this.setState({ data: nextData });
  }

  renderForm() {
    const { session } = this.props;
    const { intl } = this.context;
    const { server, username, password } = this.state.data;
    return (
      <View style={styles.container}>
        <Image source={require('../resources/logo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder='http(s)://jira.company.com'
          numberOfLines={1}
          autoFocus={true}
          value={server}
          onChangeText={(server) => this.handleFormChange('server', server)}
          underlineColorAndroid={'transparent'}
          textAlign='center'
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder={intl.messages.username}
          numberOfLines={1}
          autoFocus={true}
          value={username}
          onChangeText={(username) => this.handleFormChange('username', username)}
          underlineColorAndroid={'transparent'}
          textAlign='center'
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder={intl.messages.password}
          numberOfLines={1}
          autoFocus={true}
          value={password}
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
            this.handleLoginCheck()
          }}
        >
          <View
            style={styles.button}
          >
            <FormattedMessage id='signIn'>
              {(message) => (
                <Text style={styles.buttonText}>{message}</Text>
              )}
            </FormattedMessage>
          </View>
        </TouchableWithoutFeedback>
        <DropdownAlert ref={(ref) => this.alert = ref} />
      </View>
    )
  }
  renderLoading() {
    return <LoadingView loading={true} />;
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
  session: PropTypes.object,
  onLogin: PropTypes.func
}

LoginView.contextTypes = {
  intl: PropTypes.object.isRequired
}

function mapState2Props(state) {
  const { session, routes } = state;
  return {
    session,
    routes
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onLogin: actions.login
  };
}

export default connect(mapState2Props, mapDispatch2Props)(LoginView);