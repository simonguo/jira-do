import {
  AsyncStorage
} from 'react-native';
export default function fetchData(url, options, successCallback, failCallback) {
  console.log(url);
  let nextOptions = {
    method: 'get',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    ...options
  };
  fetch(url, nextOptions)
    .then((response) => response.json())
    .then((responseJSON) => {
      successCallback(responseJSON);
    })
    .catch((error) => {
      failCallback(error);
    });
};