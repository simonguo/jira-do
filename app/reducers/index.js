import { combineReducers } from 'redux';
import session from './sessionReducer';
import allData from './allDataReducer';
import routes from './routes';

const rootReducer = combineReducers({
  routes,
  session,
  allData
});

export default rootReducer