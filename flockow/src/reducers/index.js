import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import FirstAccessReducer from './FirstAccessReducer';
import FirstStageReducer from './FirstStageReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  firstAccess: FirstAccessReducer,
  stage_1_list: FirstStageReducer
});
