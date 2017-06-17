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
    case Types.FETCH_BOARD_WORK_ALLDATA:
      return {
        ...state,
        dataStatus: action.status,
        data: action.allData
      };
    case Types.FETCH_RAPID_VIEWS_CONFIG:
      return {
        ...state,
        configStatus: action.status,
        config: action.config
      };
    case Types.FETCH_BOARD_ISSUE_DETAILS:
      return {
        ...state,
        detailStatus: action.status,
        detail: action.detail
      };
    default:
      return state
  }
}

export default allDataReducer;