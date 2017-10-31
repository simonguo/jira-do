import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider, connect} from 'react-redux';

import reducers from './reducers';
import LoginView from './components/LoginView';
import HomeView from './components/HomeView';
import Launch from './components/Launch';
import SettingView from './components/SettingView';
import DetailView from './components/DetailView';
import WorklogForm from './components/WorklogForm';
import Worklog from './components/Worklog';
//locale
import { addLocaleData, IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import locales from './locales';

addLocaleData([...zh, ...en]);

const RouterWithRedux = connect()(Router);
const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducers);

const intlConfig = {
  en: 'en-US',
  zh: 'zh-CN'
};


class AppView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      intl: 'en'
    };
  }
  componentWillMount () {
    this.setIntl();
  }
  setIntl = (isEnglish) => {
    if (isEnglish === undefined) {
      AsyncStorage.getItem('isEnglish', (err, bool) => {
        this.setState({
          intl: bool === 'true' ? 'en' : 'zh'
        });
      });
    } else {
      this.setState({
        intl: isEnglish ? 'en' : 'zh'
      });
    }

  }
  getChildContext() {
    const { intl } = this.state;
    return {
      isEnglish: intl === 'en',
      setIntl: this.setIntl
    };
  }
  render() {
    const { intl } = this.state;
    return (
      <Provider store={store}>
        <IntlProvider
          locale={intl}
          messages={locales[intlConfig[intl]]}
        >
          <RouterWithRedux>
            <Scene key="root">
              <Scene key="launch" component={Launch} hideNavBar title="Launch" initial={true}/>
              <Scene key="login" component={LoginView} hideNavBar title="Login"/>
              <Scene key="home" component={HomeView} hideNavBar/>
              <Scene key="setting" component={SettingView} hideNavBar direction="vertical"/>
              <Scene key="detail" component={DetailView} hideNavBar direction="vertical"/>
              <Scene key="worklogForm" component={WorklogForm} hideNavBar direction="vertical"/>
              <Scene key="worklog" component={Worklog} hideNavBar direction="vertical"/>
            </Scene>
          </RouterWithRedux>
        </IntlProvider>

      </Provider>
    )
  }
}

AppView.childContextTypes = {
  isEnglish: PropTypes.bool,
  setIntl: PropTypes.func
}

export default AppView;