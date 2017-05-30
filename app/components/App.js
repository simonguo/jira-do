/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  AsyncStorage,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { fetchRapidViews } from '../actions/rapidviews';
import { fetchAllData, fetchRapidViewsConfig } from '../actions/allData';

import SideMenu from 'react-native-side-menu'
import Menu from './Menu';
import BoardView from './BoardView';
import LoginView from './LoginView';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import styles from '../styles/App.style';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedItem: null,
      session: null
    }
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleFetchRapidViews = this.handleFetchRapidViews.bind(this);
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
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
      isOpen: false,
      selectedItem: item
    });

    this.getServer((server) => {
      this.loadAllData(server, item.id);
    })
  }
  componentWillMount() {
    AsyncStorage.getItem('session').then(data => {
      data && this.handleLoginSubmit(JSON.parse(data));
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
    }));
  }

  loadAllData(server, rapidViewId) {
    const { dispatch } = this.props;
    dispatch(fetchAllData(server, rapidViewId));
    dispatch(fetchRapidViewsConfig(server, rapidViewId))
  }

  handleFetchRapidViews() {
    const { dispatch } = this.props;
    this.getServer((server) => {
      dispatch(fetchRapidViews(server, (resp) => {
        const firstItem = _.get(resp, ['views', 0]);
        this.setState({ selectedItem: firstItem });
        this.loadAllData(server, firstItem.id)
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
                isOpen: true
              })
            }}
          />
          <Text style={styles.titleText}>{tilte}</Text>
        </View>
        <BoardView
          allData={allData}
        />
      </View>

    )
  }
  render() {

    const { session } = this.props;
    const auth = _.get(session, ['data', 'session', 'value']);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />
        {auth ?
          (
            <SideMenu
              menu={this.renderMenu()}
              isOpen={this.state.isOpen}
              openMenuOffset={250}
              onChange={(isOpen) => this.updateMenuState(isOpen)}
            >
              {this.renderBoardView()}
            </SideMenu>
          ) : this.renderLoginView()
        }
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

