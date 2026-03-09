/* eslint-disable linebreak-style */
import { ActionType } from './action';


function usersReducer(users = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_USERS:
    return action.payload.users;
  default:
    return ;
  }
}

export default usersReducer;