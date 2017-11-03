
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Switch,
  Button,
  AsyncStorage
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as sessionActionCreators from '../actions/session';
import styles from '../styles/SettingView.style';
import NavBar from './NavBar';
import Avatar from './Avatar';
import { Line, Row } from './common/List';
import { FlexView } from './common/Layout';
import { ButtonBlock } from './common/Button';

class SettingView extends PureComponent {
  constructor(props, context) {
    super(props);
    this.state = {
      isEnglish: context.isEnglish
    };
  }

  handelIntlChange = (bool) => {
    this.setState({
      isEnglish: bool
    });
    AsyncStorage.setItem('isEnglish', bool ? 'true' : 'false', () => {
      this.context.setIntl(bool);
    });
  }

  handleLogout = () => {
    AsyncStorage.removeItem('session');
    this.props.onLogout();
    Actions.reset('login');
  }

  render() {
    const { userConfig = {} } = this.props;
    let { displayName, avatarUrls, name } = userConfig || {};
    const { messages: intlDict } = this.context.intl;

    let { isEnglish } = this.state;

    return (
      <FlexView>
        <NavBar
          title={intlDict.settings}
          leftIcon='ios-arrow-back'
          onLeftIconPress={() => Actions.pop()}
        />
        <View style={styles.user}>
          <Avatar
            style={styles.avatar}
            uri={avatarUrls && avatarUrls['48x48']}
            width={36}
            height={36}
          />
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        <Row label={intlDict.version}>
          <Text style={styles.text}>
            V 2.0.1
          </Text>
        </Row>
        <Row label={intlDict.intl}>
          <Switch
            onValueChange={this.handelIntlChange}
            value={isEnglish}
          />
        </Row>
        <ButtonBlock
          onPress={this.handleLogout}
          title='登出'
          type='default'
        />

      </FlexView>
    );
  }
};

SettingView.propTypes = {
  userConfig: PropTypes.object,
  onLogoutSubmit: PropTypes.func
};

SettingView.contextTypes = {
  intl: PropTypes.object.isRequired,
  isEnglish: PropTypes.bool,
  setIntl: PropTypes.func
};

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators({
    ...sessionActionCreators
  }, dispatch);

  return {
    onLogout: actions.logout
  };
}

export default connect(null, mapDispatch2Props)(SettingView);
