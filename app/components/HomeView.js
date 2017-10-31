/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  AsyncStorage,
  StatusBar,
  Platform
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as sessionActionCreators from '../actions/session';
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

class HomeView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuExpand: false,
      selectedItem: null,
      session: null,
      projectList: [],
      statusConfig: [],
      userConfig: null,
      username: null
    };
    this.handleMenuItemSelected = this.handleMenuItemSelected.bind(this);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleFetchProjectList = this.handleFetchProjectList.bind(this);
  }
  componentWillMount() {
    AsyncStorage.getItem('selectedItem').then(item => {
      item && this.setState({ selectedItem: JSON.parse(item) });
    });
    AsyncStorage.getItem('username').then(username =>
      this.setState({ username }, this.handleFetchUserConfig)
    );
    this.handleFetchProjectList();
    this.handleFetchStatusConfig();
  }

  updateMenuState(menuExpand) {
    this.setState({ menuExpand });
  }
  handleAlert(type, title, message) {
    this.alert.alertWithType(type, title, message);
  }
  handelExpandMenu = () => {
    this.setState({
      menuExpand: true
    });
  }
  handleMenuItemSelected(item) {
    this.setState({
      menuExpand: false,
      selectedItem: item
    });

    AsyncStorage.setItem('selectedItem', JSON.stringify(item));
  }

  handelGoSetting = () => {
    const { userConfig } = this.state;
    Actions.setting({
      onLogoutSubmit: this.handleLogout,
      userConfig
    });
  }

  handleLogout() {
    AsyncStorage.removeItem('session');
    this.props.onLogout();
    Actions.login();
  }

  handleFetchProjectList() {
    const { onFetchProject } = this.props;
    onFetchProject((resp) => {
      let projectList = resp.map(project => {
        return {
          name: `${project.name}(${project.key})`,
          key: project.key
        };
      });
      this.setState({
        projectList
      });
    });
  }

  handleFetchStatusConfig() {
    const { onFetchStatusConfig } = this.props;
    onFetchStatusConfig((resp) => {
      let statusList = [];
      resp.forEach(status => {
        let obj = statusList.find(item => item.name === status.statusCategory.name);
        if (!obj) {
          obj = {
            name: status.statusCategory.name,
            id: [],
            color: status.statusCategory.colorName
          };
          statusList.push(obj);
        }
        obj.id.push(status.id);
      });
      this.setState({
        statusConfig: statusList
      });
    });
  }

  handleFetchUserConfig() {
    const { onFetchUserConfig } = this.props;
    onFetchUserConfig(this.state.username, (resp) => {
      this.setState({
        userConfig: resp
      });
    });
  }

  handleItemSelect(item) {
    const { onFetchDetail } = this.props;
    onFetchDetail(item.key, (resp)=>{
      Actions.detail({
        data: resp
      });
    });
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
    const { userConfig } = this.state;
    return (
      <Menu
        activeItem={this.state.selectedItem}
        onItemSelected={this.handleMenuItemSelected}
        projectList={this.state.projectList}
        onFetchProject={this.handleFetchProjectList}
        userConfig={userConfig}
      />
    );
  }
  renderBoardView() {

    const { rapidViews, onFetchDetail, onFetchIssueList } = this.props;
    const { selectedItem, statusConfig, userConfig, projectList } = this.state;
    // const tilte = _.get(selectedItem, ['name']) || 'JIRA';

    const project = selectedItem || projectList[0] || {
      name: 'JIRA',
      key: ''
    };

    return (

      <View
        style={styles.boardView}>
        <NavBar
          title={project.name}
          leftIcon='ios-menu-outline'
          onLeftIconPress={this.handelExpandMenu}
          rightIcon='ios-cog'
          onRightIconPress={this.handelGoSetting}
        />
        <BoardView
          onItemSelect={this.handleItemSelect}
          project={project.key}
          statusConfig={statusConfig}
          onFetchIssueList={onFetchIssueList}
        />
      </View>
    );
  }
  render() {

    const { session } = this.props;
    const auth = _.get(session, ['data', 'session', 'value']);
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#0054C9'
      }}>
        <StatusBar
          barStyle="light-content"
        />
        <SideMenu
          menu={this.renderMenu()}
          isOpen={this.state.menuExpand}
          /* isOpen={false} */
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
  const { session, routes, rapidViews } = state;
  return {
    routes,
    session,
    rapidViews,
    // allData
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators({
    ...sessionActionCreators,
    ...allDataActionCreators
  }, dispatch);

  return {
    onFetchDetail: actions.fetchDetail,
    onLogout: actions.logout,
    onFetchProject: actions.fetchProjectList,
    onFetchStatusConfig: actions.fetchStatusConfig,
    onFetchIssueList: actions.fetchIssueList,
    onFetchUserConfig: actions.fetchUserConfig
  };
}

export default connect(mapState2Props, mapDispatch2Props)(HomeView);

