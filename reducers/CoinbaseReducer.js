import {
  COINBASE_LOGIN_SUCCESS,
  COINBASE_LOGIN_FAIL
 } from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case COINBASE_LOGIN_SUCCESS:
      return { token: action.payload };
    case COINBASE_LOGIN_FAIL:
      return { token: null };
    default:
      return state;
  }
}
