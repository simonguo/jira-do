import 'react-native';
import React from 'react';

import Index from '../index.ios.js';
import Avatar from '../app/components/Avatar';
import IssueItem from '../app/components/IssueItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeAll(() => {
  // require('isomorphic-fetch');
  global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

it.skip('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
  expect(tree).toMatchSnapshot();
});

