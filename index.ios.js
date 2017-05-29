import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Index from './app/setup';

class JiraAgileApp extends Component {
  render() {
    return (
      <Index />
    );
  }
}

AppRegistry.registerComponent('JiraAgileApp', () => JiraAgileApp);