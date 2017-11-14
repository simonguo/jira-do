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
    case Types.EDIT_ISSUE_DETAILS:
      return {
        ...state,
        editDetailStatus: action.status
      };
    case Types.FETCH_PROJECT_LIST:
      return {
        ...state,
        projectListStatus: action.status,
        projectList: action.list
      };
    case Types.FETCH_STATUS_CONFIG:
      return {
        ...state,
        statusConfigStatus: action.status,
        statusConfig: action.config
      };
    case Types.FETCH_ISSUE_LIST:
      return {
        ...state,
        issueListStatus: action.status,
        issueList: action.list
      };
    case Types.FETCH_USER_CONFIG:
      return {
        ...state,
        userConfigStatus: action.status,
        userConfig: action.userConfig
      };
    case Types.ADD_WORKLOG:
      return {
        ...state,
        addWorklogStatus: action.status
      };
    case Types.FETCH_WORKLOG:
      return {
        ...state,
        worklogs: action.worklogs,
        worklogsStatus: action.status
      };
    case Types.FETCH_TRANSITIONS:
      return {
        ...state,
        transtionsStatus: action.status
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