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

export function fetchRapidViews(server, successCallback, failCallback) {
  return createFetchAction({
    url: `${server}${APIs.API_RAPIDVIEWS_VIEWSDATA}`,
    actionModel: rapidviewsAction,
    onSuccess: successCallback,
    onError: failCallback
  });
}
