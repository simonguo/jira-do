import 'react-native';
import React from 'react';

import Avatar from '../app/components/Avatar';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeAll(() => {
  require('isomorphic-fetch');
  global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe.skip('Avatar', () => {

  // 自定义的 png 格式头像
  test('Avatar custom png', () => {
    const tree = renderer.create(
      <Avatar
        uri='https://jira.hypers.com/secure/useravatar?size=small&ownerId=jianbo.yu&avatarId=11718'
      />
    );
    expect(tree).toMatchSnapshot();
  });

  // svg 格式头像
  test('Avatar default svg', done => {
    const tree = renderer.create(
      <Avatar
        uri='https://jira.hypers.com/secure/useravatar?size=small&avatarId=10122'
      />
    );
    expect(tree).toMatchSnapshot();
    setTimeout(() => {
      expect(tree).toMatchSnapshot();
      done();
    }, 5000);
  });

  // svg 的 uri 错误
  test('Avatar svg uri error', done => {
    const tree = renderer.create(
      <Avatar
        uri='https://jiraa.hypersS.com/secure/useravatar?size=small&avatarId=4367467526'
      />
    );
    expect(tree).toMatchSnapshot();
    setTimeout(() => {
      expect(tree).toMatchSnapshot();
      done();
    }, 5000);
  });

  // 无 uri
  test('Avatar uri is undefined', done => {
    const tree = renderer.create(
      <Avatar />
    );
    expect(tree).toMatchSnapshot();
  });


});

