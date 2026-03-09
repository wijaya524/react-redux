/* eslint-disable linebreak-style */
import { ActionType } from './action';

/**
 * Reducer untuk mengelola state users (daftar pengguna).
 * Default state adalah array kosong [].
 */
function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return action.payload.authUser;
  case ActionType.UNSET_AUTH_USER:
    return null;
  default:
    return authUser;
  }
}

export default authUserReducer;