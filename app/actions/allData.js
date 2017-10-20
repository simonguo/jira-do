import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import { createFetchAction } from './actionHelper';


const detailAction = (data, status) => {
  return {
    type: Types.FETCH_BOARD_ISSUE_DETAILS,
    detail: data,
    status
  }
};

export function fetchDetail(rapidViewId, issueIdOrKey, successCallback, failCallback) {
  return createFetchAction({
    url: `${APIs.API_XBOARD_ISSUE_DETAILS}/${issueIdOrKey}`,
    actionModel: detailAction,
    onSuccess: successCallback,
    onError: failCallback
  });
}


// 获取项目列表
const projectList = (data, status) => {
  return {
    type: Types.FETCH_PROJECT_LIST,
    list: data,
    status
  };
};

export function fetchProjectList(successCallback, failCallback) {
  return createFetchAction({
    url: APIs.API_PROJECT,
    actionModel: projectList,
    onSuccess: successCallback,
    onError: failCallback
  });
}

// 获取状态列表
const statusConfig = (data, status) => {
  return {
    type: Types.FETCH_STATUS_CONFIG,
    config: data,
    status
  };
};

export function fetchStatusConfig(successCallback, failCallback) {
  return createFetchAction({
    url: APIs.API_STATUS,
    actionModel: statusConfig,
    onSuccess: successCallback,
    onError: failCallback
  });
}

// 获取 issue 列表
const issueList = (data, status) => {
  return {
    type: Types.FETCH_ISSUE_LIST,
    list: data,
    status
  };
};

export function fetchIssueList({ project, status, startAt, maxResults }, successCallback, failCallback) {
  return createFetchAction({
    url: `${APIs.API_SEARCH}?jql=project = '${project}' and status in (${status.join(',')})&startAt=${startAt}&maxResults=${maxResults}`,
    actionModel: issueList,
    onSuccess: successCallback,
    onError: failCallback
  });
}

// 获取 用户信息
const userConfig = (data, status) => {
  return {
    type: Types.FETCH_USER_CONFIG,
    userConfig: data,
    status
  };
};

export function fetchUserConfig(username, successCallback, failCallback) {
  return createFetchAction({
    url: `${APIs.API_USER}?username=${username}`,
    actionModel: userConfig,
    onSuccess: successCallback,
    onError: failCallback
  });
}
