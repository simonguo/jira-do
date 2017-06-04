import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import fetchData from '../utils/fetchData';

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

export function login(data, callback) {
  const { username, password, server } = data;
  const body = JSON.stringify({
    username,
    password
  });

  return dispatch => {
    dispatch(loginAction({}, 'REQUEST'));
    fetchData(`${server}${APIs.API_AUTH_SESSION}`, {
      method: 'post',
      body
    }, (response) => {
      dispatch(loginAction(response, 'SUCCESS'));
      dispatch(initServerAction(server));
      callback && callback(response);
    }, (error) => {
      dispatch(loginAction({}, 'ERROR'))
    })
  }
}

export function logout() {
  return dispatch => {
    dispatch(logoutAction());
  }
}