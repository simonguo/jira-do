import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import { createFetchAction } from './actionHelper';


let allDateAction = (data, status) => {
  return {
    type: Types.FETCH_BOARD_WORK_ALLDATA,
    allData: data,
    status
  }
};

export function fetchAllData(server, rapidViewId, successCallback, failCallback) {
  return createFetchAction({
    url: `${server}${APIs.API_XBOARD_WORK_ALLDATA}?rapidViewId=${rapidViewId}`,
    actionModel: allDateAction,
    onSuccess: successCallback,
    onError: failCallback
  });
}


let rapidviewsConfigAction = (data, status) => {
  return {
    type: Types.FETCH_RAPID_VIEWS_CONFIG,
    config: data,
    status
  }
};

export function fetchRapidViewsConfig(server, rapidViewId, successCallback, failCallback) {
  return createFetchAction({
    url: `${server}${APIs.API_RAPIDVIEWS_CONFIG_EDITMODEL}?rapidViewId=${rapidViewId}`,
    actionModel: rapidviewsConfigAction,
    onSuccess: successCallback,
    onError: failCallback
  });
}