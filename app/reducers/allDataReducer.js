import * as Types from '../constants/ActionTypes';

const initialState = {
  data: {}
};

let allDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_BOARD_WORK_ALLDATA:
      return {
        ...state,
        data: action.allData
      };
    default:
      return state
  }
}

export default allDataReducer;