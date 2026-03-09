/* eslint-disable linebreak-style */

import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};


function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}


export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};