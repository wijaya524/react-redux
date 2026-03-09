import { describe, it } from 'vitest';
import usersReducer from './reducer';

import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer', () => {

  it('should return initial state when given unknown action', () => {
    const initialState = [];

    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should return users when given RECEIVE_USERS action', () => {
    const initialState = [];

    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          { id: 'user-1', name: 'Arya' },
          { id: 'user-2', name: 'Budi' },
        ],
      },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });

});