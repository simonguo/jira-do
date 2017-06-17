import { combineReducers } from 'redux';
import session from './sessionReducer';
import rapidViews from './rapidViewsReducer';
import allData from './allDataReducer';
import routes from './routes';

const rootReducer = combineReducers({
  routes,
  session,
  rapidViews,
  allData
});

export default rootReducer