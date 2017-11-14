import 'react-native';
import React from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as allDataActionCreators from '../app/actions/allData';
import * as actionCreators from '../app/actions/session';
import reducers from '../app/reducers';
import * as types from '../app/constants/ActionTypes';
import { initialState } from '../app/reducers/sessionReducer';

jest.mock('AsyncStorage');

const session = {
  server: 'https://jira.hypers.com',
  username: 'jianbo.yu',
  password: '******'
};

let store;

beforeAll(() => {
  // require('isomorphic-fetch');
  global.fetch = require('jest-fetch-mock');
  global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;  

  store = compose(
    applyMiddleware(thunk)
  )(createStore)(reducers);

  require('AsyncStorage').db = { session };

  // return new Promise((resolve, reject) => {
  //   store.dispatch(actionCreators.login(session, res => {
  //     console.log(res);
  //     resolve();
  //   }));
  // });

});

// beforeEach(() => {
//   store = compose(
//     applyMiddleware(thunk)
//   )(createStore)(reducers);
// });

describe.only('Reducer', () => {

  it('login', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(actionCreators.login(session, res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        session: {
          data: mockDefaultData,
          // username: session.username,
          server: session.server,
          status: 'SUCCESS'
        }
      });
      done();
    }));
  });

  it('logout', () => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    actionCreators.logout()(store.dispatch);
    expect(store.getState()).toMatchObject({
      session: initialState
    });
  });

  it('fetchDetail', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchDetail(28093, res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          detailStatus: 'SUCCESS',
          detail: mockDefaultData
        }
      });
      done();
    }));
  });

  it('fetchProjectList', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchProjectList(res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          projectListStatus: 'SUCCESS',
          projectList: mockDefaultData
        }
      });
      done();
    }));
  });

  it('fetchStatusConfig', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchStatusConfig(res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          statusConfigStatus: 'SUCCESS',
          statusConfig: mockDefaultData
        }
      });
      done();
    }));
  });

  it('fetchIssueList', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchIssueList({
      jql: 'jql',
      startAt: 0,
      maxResults: 50
    }, res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          issueListStatus: 'SUCCESS',
          issueList: mockDefaultData
        }
      });
      done();
    }));
  });

  it('fetchIssueList', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchIssueList({
      project: 'project',
      status: [1, 2, 3],
      startAt: 0,
      maxResults: 50
    }, res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          projectListStatus: 'SUCCESS',
          projectList: mockDefaultData
        }
      });
      done();
    }));
  });

  it('fetchUserConfig', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchUserConfig('username', res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          userConfigStatus: 'SUCCESS',
          userConfig: mockDefaultData
        }
      });
      done();
    }));
  });

  it('addWorklog', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.addWorklog(34135143, {
      comment: 'test'
    }, res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          addWorklogStatus: 'SUCCESS'
        }
      });
      done();
    }));
  });

  it('fetchWorklog', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchWorklog(425454, res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          worklogsStatus: 'SUCCESS',
          worklogs: mockDefaultData
        }
      });
      done();
    }));
  });

  it('fetchFilterList', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.fetchFilterList(res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          filtersStatus: 'SUCCESS',
          filters: mockDefaultData
        }
      });
      done();
    }));
  });

  it('editIssue', done => {
    fetch.mockResponseOnce(JSON.stringify(mockDefaultData));
    store.dispatch(allDataActionCreators.editIssue(28093, mockDefaultData, res => {
      expect(res).toEqual(mockDefaultData);
      expect(store.getState()).toMatchObject({
        allData: {
          editDetailStatus: 'SUCCESS'
        }
      });
      done();
    }));
  });

});


mockDefaultData = {
  text: '如果对结果的具体内容没有要求，只要求和设定的一样，用这个就行了'
};
