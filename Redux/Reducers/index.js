import { combineReducers } from 'redux';
import MunroReducer from './MunrosReducer';

export default combineReducers({
  munros: MunroReducer,
});
