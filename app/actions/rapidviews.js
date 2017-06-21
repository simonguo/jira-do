import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import { createFetchAction } from './actionHelper';


let rapidviewsAction = (data, status) => {
  return {
    type: Types.FETCH_RAPID_VIEWS,
    rapidViews: data,
    status
  }
};

export function fetchRapidViews(successCallback, failCallback) {
  return createFetchAction({
    url: APIs.API_RAPIDVIEWS_VIEWSDATA,
    actionModel: rapidviewsAction,
    loading: false,
    onSuccess: successCallback,
    onError: failCallback
  });
}
