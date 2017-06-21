import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

import reducers from './reducers';
import LoginView from './components/LoginView';
import HomeView from './components/HomeView';
import Launch from './components/Launch';
import SettingView from './components/SettingView';
import DetailView from './components/DetailView';

//locale
import { IntlProvider } from 'react-intl';
import locales from './locales';

const RouterWithRedux = connect()(Router);
const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducers);



class AppView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <IntlProvider
          locale={'en'}
          messages={locales['en-US']}
        >
          <RouterWithRedux>
            <Scene key="root">
              <Scene key="launch" component={Launch} hideNavBar title="Launch" initial={true}  />
              <Scene key="login" component={LoginView} hideNavBar title="Login" />
              <Scene key="home" component={HomeView} hideNavBar />
              <Scene key="setting" component={SettingView} hideNavBar direction="vertical" />
              <Scene key="detail" component={DetailView} hideNavBar direction="vertical" />
            </Scene>
          </RouterWithRedux>
        </IntlProvider>

      </Provider>
    )
  }
}

export default AppView;