import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import { createFetchAction } from './actionHelper';

let loginAction = (data, status) => {
  return {
    type: Types.LOGIN,
    data,
    status
  }
};

let logoutAction = () => {
  return {
    type: Types.LOGOUT
  }
};

let initServerAction = (server) => {
  return {
    type: Types.INIT_SERVER,
    server
  }
}

export function login(data, successCallback, failCallback) {
  const { username, password, server } = data;
  const body = JSON.stringify({
    username,
    password
  });

  return createFetchAction({
    url: `${server}${APIs.API_AUTH_SESSION}`,
    actionModel: loginAction,
    options: {
      method: 'post',
      body
    },
    onSuccess: (response, dispatch) => {
      dispatch(initServerAction(server));
      successCallback && successCallback(response);
    }
  });
}

export function logout() {
  return dispatch => {
    dispatch(logoutAction());
  }
}