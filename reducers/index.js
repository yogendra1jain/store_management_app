import { combineReducers } from 'redux';
import auth from './auth';
import nativeAuth from './nativeAuth';
import commonReducer from './commonReducer';



export default combineReducers({
  auth,
  nativeAuth,
  commonReducer
});
