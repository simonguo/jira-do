import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Index from './app/setup';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}

class JiraAgileApp extends Component {
  render() {
    return (
      <Index />
    );
  }
}

  
AppRegistry.registerComponent('JiraAgileApp', () => JiraAgileApp);