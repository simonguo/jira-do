import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import { createFetchAction } from './actionHelper';


const allDateAction = (data, status) => {
  return {
    type: Types.FETCH_BOARD_WORK_ALLDATA,
    allData: data,
    status
  }
};

export function fetchAllData(rapidViewId, successCallback, failCallback) {
  return createFetchAction({
    url: `${APIs.API_XBOARD_WORK_ALLDATA}?rapidViewId=${rapidViewId}`,
    actionModel: allDateAction,
    onSuccess: successCallback,
    onError: failCallback
  });
}


const rapidviewsConfigAction = (data, status) => {
  return {
    type: Types.FETCH_RAPID_VIEWS_CONFIG,
    config: data,
    status
  }
};

export function fetchRapidViewsConfig(rapidViewId, successCallback, failCallback) {
  return createFetchAction({
    url: `${APIs.API_RAPIDVIEWS_CONFIG_EDITMODEL}?rapidViewId=${rapidViewId}`,
    actionModel: rapidviewsConfigAction,
    onSuccess: successCallback,
    onError: failCallback
  });
}



const detailAction = (data, status) => {
  return {
    type: Types.FETCH_BOARD_ISSUE_DETAILS,
    detail: data,
    status
  }
};

export function fetchDetail(rapidViewId, issueIdOrKey, successCallback, failCallback) {
  return createFetchAction({
    url: `${APIs.API_XBOARD_ISSUE_DETAILS}?rapidViewId=${rapidViewId}&issueIdOrKey=${issueIdOrKey}&loadSubtasks=true`,
    actionModel: detailAction,
    onSuccess: successCallback,
    onError: failCallback
  });
}
