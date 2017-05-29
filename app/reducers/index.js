import { combineReducers } from 'redux';
import session from './sessionReducer';
import rapidViews from './rapidViewsReducer';
import allData from './allDataReducer';

const rootReducer = combineReducers({
  session,
  rapidViews,
  allData
});

export default rootReducer