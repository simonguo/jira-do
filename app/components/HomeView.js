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
  StatusBar
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as sessionActionCreators from '../actions/session';
import * as rapidviewsActionCreators from '../actions/rapidviews';
import * as allDataActionCreators from '../actions/allData';

import SideMenu from 'react-native-side-menu';
import DropdownAlert from 'react-native-dropdownalert';
import Menu from './Menu';
import BoardView from './BoardView';
import LoginView from './LoginView';
import SettingView from './SettingView';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from './NavBar';
import styles from '../styles/App.style';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpand: false,
      selectedItem: null,
      session: null
    }
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFetchRapidViews = this.handleFetchRapidViews.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }
  componentWillMount() {
    AsyncStorage.getItem('selectedItem').then(item => {
      item && this.setState({ selectedItem: JSON.parse(item) });
    });
    this.handleFetchRapidViews();
  }

  updateMenuState(menuExpand) {
    this.setState({ menuExpand });
  }
  handleAlert(type, title, message) {
    this.alert.alertWithType(type, title, message);
  }
  handleMenuItemSelected(item) {
    this.setState({
      menuExpand: false,
      selectedItem: item
    });

    AsyncStorage.setItem('selectedItem', JSON.stringify(item));
    this.loadAllData(item.id);
  }

  handleLogout() {
    AsyncStorage.removeItem('session');
    this.props.onLogout();
    Actions.login();
  }

  loadAllData(rapidViewId) {
    const { onFetchAllData, onFetchRapidViewsConfig } = this.props;
    const showError = (error) => {
      this.handleAlert('error', 'Error', error.toString());
    }
    onFetchAllData(rapidViewId, null, showError);
    onFetchRapidViewsConfig(rapidViewId, null, showError);
  }


  handleFetchRapidViews(callback) {
    const { onFetchRapidViews } = this.props;
    onFetchRapidViews((resp) => {
      const selectedItem = this.state.selectedItem || _.get(resp, ['views', 0]);
      if (selectedItem) {
        this.setState({ selectedItem });
        this.loadAllData(selectedItem.id)
        callback && callback(resp);
      }
    }, (e) => {
      this.handleAlert('error', 'Error', e.toString());
    });
  }

  handleItemSelect(item) {
    const { selectedItem } = this.state;
    const { onFetchDetail } = this.props;
    onFetchDetail(selectedItem.id, item.key);
    Actions.detail();
  }

  renderLoginView() {
    const { session } = this.props;
    return (
      <LoginView
        session={session}
        alert={this.handleAlert}
        onLoginSubmit={this.handleLoginSubmit}
      />
    );
  }
  renderMenu() {
    const { rapidViews } = this.props;
    return (
      <Menu
        activeItem={this.state.selectedItem}
        rapidViews={rapidViews ? rapidViews.data : null}
        onFetchRapidViews={this.handleFetchRapidViews}
        onItemSelected={this.handleMenuItemSelected}
      />
    );
  }
  renderBoardView() {

    const { allData, rapidViews, onFetchDetail } = this.props;
    const { selectedItem } = this.state;
    const tilte = _.get(selectedItem, ['name']) || 'JIRA';

    return (

      <View
        style={styles.boardView}>
        <NavBar
          title={tilte}
          leftIcon='ios-menu-outline'
          onLeftIconPress={() => {
            this.setState({
              menuExpand: true
            })
          }}
          rightIcon='ios-cog'
          onRightIconPress={() => {
            Actions.setting({
              onLogoutSubmit: this.handleLogout,
              userConfig: _.get(rapidViews, ['data', 'globalConfig', 'userConfig'])
            });
          }}
        />
        <BoardView
          onItemSelect={this.handleItemSelect}
          allData={allData}
        />
      </View>
    );
  }
  render() {

    const { session } = this.props;
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
            auth ? this.renderBoardView() : this.renderLoginView()
          }
        </SideMenu>
        <DropdownAlert ref={(ref) => this.alert = ref} />
      </View>
    );
  }
}


function mapState2Props(state) {
  const { session, routes, rapidViews, allData, } = state;
  return {
    routes,
    session,
    rapidViews,
    allData
  }
}

function mapDispatch2Props(dispatch) {
  allDataActionCreators

  const actions = bindActionCreators({
    ...sessionActionCreators,
    ...rapidviewsActionCreators,
    ...allDataActionCreators
  }, dispatch);
  return {
    onFetchAllData: actions.fetchAllData,
    onFetchRapidViewsConfig: actions.fetchRapidViewsConfig,
    onFetchRapidViews: actions.fetchRapidViews,
    onFetchDetail: actions.fetchDetail,
    onLogout: actions.logout
  };
}

export default connect(mapState2Props, mapDispatch2Props)(HomeView);

