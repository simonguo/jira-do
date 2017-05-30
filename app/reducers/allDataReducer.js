import * as Types from '../constants/ActionTypes';

const initialState = {
  data: {},
  config: {}
};

let allDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_BOARD_WORK_ALLDATA:
      return {
        ...state,
        data: action.allData
      };
    case Types.FETCH_RAPID_VIEWS_CONFIG:
      return {
        ...state,
        config: action.config
      };
    default:
      return state
  }
}

export default allDataReducer;