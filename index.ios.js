import React, { PureComponent } from 'react';
import {
  AppRegistry,
  AsyncStorage
} from 'react-native';
import Index from './app/setup';
import _ from 'lodash';

// import { shallowEqual } from './app/utils/commen';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}

if (__DEV__) {
  // AsyncStorage.clear();
  // AsyncStorage.setItem('session', JSON.stringify({"server":"https://jira.hypers.com","username":"jianbo.yu","password":"HAWK755"}));
  // console.disableYellowBox = true;
  // console.warn('YellowBox is disabled.');
  // PureComponent.prototype.componentWillUpdate = function(nextProps, nextState) {
  //   console.log(this);
    // if (this.__renderCount__ === undefined) {
    //   this.__renderCount__ = 0;
    // }
    // shallowEqual(this.props, nextProps, 'props', this);
    // shallowEqual(this.state, nextState, 'state', this);
    // this.__renderCount__ += 1;
    // console.log(this.__renderCount__);
    // this.componentWillUpdate(nextProps, nextState);
  // };
}

export default class JiraAgileApp extends PureComponent {
  render() {
    return (
      <Index />
    );
  }
}

  
AppRegistry.registerComponent('JiraAgileApp', () => JiraAgileApp);