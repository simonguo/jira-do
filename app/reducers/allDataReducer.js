import * as Types from '../constants/ActionTypes';

const initialState = {
  data: {},
  dataStatus: null,
  config: {},
  configStatus: null,
  detail: {},
  detailStatus: null
};

let allDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_BOARD_ISSUE_DETAILS:
      return {
        ...state,
        detailStatus: action.status,
        detail: action.detail
      };
    case Types.FETCH_PROJECT_LIST:
      return {
        ...state,
        dataStatus: action.status,
        list: action.list
      };
    case Types.FETCH_STATUS_CONFIG:
      return {
        ...state,
        dataStatus: action.status,
        config: action.config
      };
    case Types.FETCH_ISSUE_LIST:
      return {
        ...state,
        dataStatus: action.status,
        list: action.list
      };
    case Types.FETCH_USER_CONFIG:
      return {
        ...state,
        dataStatus: action.status,
        userConfig: action.userConfig
      };
    case Types.ADD_WORKLOG:
      return {
        ...state,
        assWorklogStatus: action.status
      };
    case Types.FETCH_WORKLOG:
      return {
        ...state,
        worklogs: action.worklogs,
        worklogsStatus: action.status
      };
    case Types.FETCH_FILTER_LIST:
      return {
        ...state,
        filters: action.filters,
        filtersStatus: action.status
      };
    default:
      return state;
  }
}

export default allDataReducer;