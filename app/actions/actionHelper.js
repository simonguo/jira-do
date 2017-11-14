import fetchData from '../utils/fetchData';
import {
  AsyncStorage
} from 'react-native';

export function getServer(callback) {
  AsyncStorage.getItem('session').then((data) => {
    if (!data) {
      return callback(null);
    }
    const server = JSON.parse(data).server;
    callback(server);
  });
}


export function createFetchAction(action) {

  const {
    actionModel,
    onSuccess,
    onError,
    url,
    loading = true,
    options,
    server
  } = action;
  const dispatcher = (apiURL, dispatch) => {
    fetchData(apiURL, Object.assign({ method: 'get' }, options), (response) => {
      dispatch(actionModel(response, 'SUCCESS'));
      onSuccess && onSuccess(response, dispatch);
    }, (error) => {
      dispatch(actionModel({}, 'ERROR'))
      onError && onError(error, dispatch);
    });
  }

  return (dispatch) => {
    loading && dispatch(actionModel({}, 'REQUEST'));
    if (server) {
      dispatcher(`${server}${url}`, dispatch);
      return;
    }

    getServer((cacheServer) => {
      cacheServer && dispatcher(`${cacheServer}${url}`, dispatch);
    });
  };

}