import React, { PureComponent } from 'react';
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

if (__DEV__) {
  console.disableYellowBox = true;
  console.warn('YellowBox is disabled.');
}


// 安卓国际化 Polyfill
var areIntlLocalesSupported = require('intl-locales-supported');

var localesMyAppSupports = [
  /* list locales here */
];

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    var IntlPolyfill    = require('intl');
    Intl.NumberFormat   = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}


class JiraAgileApp extends PureComponent {
  render() {
    return (
      <Index />
    );
  }
}

AppRegistry.registerComponent('JiraAgileApp', () => JiraAgileApp);