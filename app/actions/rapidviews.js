import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import fetchData from '../utils/fetchData';


let rapidviewsAction = (data) => {
  return {
    type: Types.FETCH_RAPID_VIEWS,
    rapidViews: data
  }
};

export function fetchRapidViews(server, callback) {
  const url = `${server}${APIs.API_RAPIDVIEWS_VIEWSDATA}`;
  console.log(server, url);
  return dispatch => {
    fetchData(url, {
      method: 'get',
    }, (response) => {
      dispatch(rapidviewsAction(response));
      callback && callback(response);
    }, (error) => {
      console.log(error, 'fetchRapidViews');
      dispatch(rapidviewsAction({}, 'ERROR'))
    });
  }
}