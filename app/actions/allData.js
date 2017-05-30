import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import fetchData from '../utils/fetchData';


let allDateAction = (data) => {
  return {
    type: Types.FETCH_BOARD_WORK_ALLDATA,
    allData: data
  }
};

export function fetchAllData(server, rapidViewId, callback) {
  const url = `${server}${APIs.API_XBOARD_WORK_ALLDATA}?rapidViewId=${rapidViewId}`;
  return dispatch => {
    dispatch(allDateAction({}));
    fetchData(url, {
      method: 'get',
    }, (response) => {
      dispatch(allDateAction(response));
      callback && callback(response);
    }, (error) => {
      dispatch(allDateAction({}, 'ERROR'))
    });
  }
}


let rapidviewsConfigAction = (data, status) => {
  return {
    type: Types.FETCH_RAPID_VIEWS_CONFIG,
    config: data,
    status
  }
};

export function fetchRapidViewsConfig(server, rapidViewId, callback) {
  const url = `${server}${APIs.API_RAPIDVIEWS_CONFIG_EDITMODEL}?rapidViewId=${rapidViewId}`;
  return dispatch => {
    dispatch(rapidviewsConfigAction({}, 'REQUEST'));
    fetchData(url, {
      method: 'get',
    }, (response) => {
      dispatch(rapidviewsConfigAction(response, 'SUCCESS'));
      callback && callback(response);
    }, (error) => {
      dispatch(rapidviewsConfigAction({}, 'ERROR'))
    });
  }
}