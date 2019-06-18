import { combineReducers } from 'redux';
import auth from './auth';
import nativeAuth from './nativeAuth';


export default combineReducers({
  auth,
  nativeAuth,
});
