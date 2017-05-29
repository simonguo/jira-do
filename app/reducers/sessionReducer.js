import * as Types from '../constants/ActionTypes';

const initialState = {
  server: '',
  data: {},
  status: null
};


let sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        data: action.data,
        status: action.status
      };
    case Types.INIT_SERVER:
      return {
        ...state,
        server: action.server
      }
    default:
      return state
  }
}

export default sessionReducer;