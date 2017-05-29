import * as Types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';
import fetchData from '../utils/fetchData';


let allDateAction = (data) => {
  console.log('data-----', data)
  return {
    type: Types.FETCH_BOARD_WORK_ALLDATA,
    allData: data
  }
};

export function fetchAllData(server, rapidViewId, callback) {
  const url = `${server}${APIs.API_XBOARD_WORK_ALLDATA}?rapidViewId=${rapidViewId}`;
  console.log('url', url);
  return dispatch => {
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