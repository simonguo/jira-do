import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  View,
  Icon
} from 'react-native';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import reducers from './reducers';
import App from './components/App';

const store = applyMiddleware(thunk)(createStore)(reducers);

class AppView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default AppView;