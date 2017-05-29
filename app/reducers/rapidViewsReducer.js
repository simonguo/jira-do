import * as Types from '../constants/ActionTypes';

const initialState = {
  data: {}
};


let rapidViewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_RAPID_VIEWS:
      return {
        ...state,
        data: action.rapidViews
      };
    default:
      return state
  }
}

export default rapidViewsReducer;