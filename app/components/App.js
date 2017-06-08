/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  AsyncStorage,
  StatusBar,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux';
import { login, logout } from '../actions/session';
import { fetchRapidViews } from '../actions/rapidviews';
import { fetchAllData, fetchRapidViewsConfig } from '../actions/allData';

import SideMenu from 'react-native-side-menu'
import Menu from './Menu';
import BoardView from './BoardView';
import LoginView from './LoginView';
import SettingView from './SettingView';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import styles from '../styles/App.style';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpand: false,
      settingExpand: false,
      selectedItem: null,
      session: null
    }
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFetchRapidViews = this.handleFetchRapidViews.bind(this);
  }
  updateMenuState(menuExpand) {
    this.setState({ menuExpand });
  }
  getServer(callback) {
    const { server } = this.state;
    if (server) {
      return callback(server);
    }
    AsyncStorage.getItem('session').then((data) => {
      if (!data) {
        return callback(null);
      }
      const server = JSON.parse(data).server;
      this.setState({ server });
      callback(server);
    })
  }

  handleMenuItemSelected(item) {
    this.setState({
      menuExpand: false,
      selectedItem: item
    });

    AsyncStorage.setItem('selectedItem', JSON.stringify(item));
    this.getServer((server) => {
      this.loadAllData(server, item.id);
    })
  }
  componentWillMount() {
    AsyncStorage.getItem('selectedItem').then(item => {
      item && this.setState({ selectedItem: JSON.parse(item) });
    });
    AsyncStorage.getItem('session').then(data => {
      if (data) {
        this.handleLoginSubmit(JSON.parse(data));
      }
    });
  }

  handleLoginSubmit(data) {
    const { dispatch } = this.props;
    dispatch(login(data, (resp) => {
      const auth = _.get(resp, ['session', 'value']);
      if (!auth) {
        AlertIOS.alert('Message', 'Incorrect username or password.');
        return;
      }
      this.setState({ server: data.server });
      AsyncStorage.setItem('session', JSON.stringify(data));
      this.handleFetchRapidViews();
    }));
  }

  handleLogout() {
    const { dispatch } = this.props;
    AsyncStorage.removeItem('session');
    dispatch(logout());
    this.setState({
      settingExpand: false
    })
  }

  loadAllData(server, rapidViewId) {
    const { dispatch } = this.props;
    dispatch(fetchAllData(server, rapidViewId));
    dispatch(fetchRapidViewsConfig(server, rapidViewId))
  }

  handleFetchRapidViews(callback) {
    const { dispatch } = this.props;
    this.getServer((server) => {
      server && dispatch(fetchRapidViews(server, (resp) => {
        const selectedItem = this.state.selectedItem || _.get(resp, ['views', 0]);
        if (selectedItem) {
          this.setState({ selectedItem });
          this.loadAllData(server, selectedItem.id)
          callback && callback(resp);
        }
      }));
    });
  }
  renderLoginView() {
    const { session } = this.props;
    return (
      <LoginView
        session={session}
        onLoginSubmit={this.handleLoginSubmit}
      />
    );
  }
  renderMenu() {
    const { rapidViews } = this.props;
    return (
      <Menu
        rapidViews={rapidViews ? rapidViews.data : null}
        onFetchRapidViews={this.handleFetchRapidViews}
        onItemSelected={this.handleMenuItemSelected}
      />
    );
  }
  renderBoardView() {

    const { allData } = this.props;
    const { selectedItem } = this.state;
    const tilte = _.get(selectedItem, ['name']) || 'JIRA';

    return (

      <View
        style={styles.boardView}>
        <View style={styles.titleBar}>
          <Icon
            name='ios-menu-outline'
            style={styles.menuIcon}
            onPress={() => {
              this.setState({
                menuExpand: true
              })
            }}
          />
          <Text style={styles.titleText}>{tilte}</Text>
          <Icon
            name='ios-cog'
            style={styles.cofIcon}
            onPress={() => {
              this.setState({
                settingExpand: true
              })
            }}
          />
        </View>
        <BoardView
          allData={allData}
        />
      </View>
    );
  }
  renderSettingView() {
    const { rapidViews } = this.props;
    return (
      <SettingView
        userConfig={rapidViews ? _.get(rapidViews, ['data', 'globalConfig', 'userConfig']) : {}}
        onLogoutSubmit={this.handleLogout}
        goBack={() => {
          this.setState({
            settingExpand: false
          })
        }}
      />
    )
  }
  render() {

    const { session } = this.props;
    const { settingExpand } = this.state;
    const auth = _.get(session, ['data', 'session', 'value']);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />
        <SideMenu
          menu={this.renderMenu()}
          isOpen={this.state.menuExpand}
          openMenuOffset={250}
          onChange={(menuExpand) => this.updateMenuState(menuExpand)}
        >
          {
            auth ?
              (
                settingExpand ?
                  this.renderSettingView() :
                  this.renderBoardView()
              ) :
              this.renderLoginView()
          }
        </SideMenu>
      </View>
    );
  }
}

export default connect((state) => {
  const { session, rapidViews, allData } = state;
  return {
    session,
    rapidViews,
    allData
  }
})(App);

