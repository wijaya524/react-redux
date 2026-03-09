import { describe, it } from 'vitest';
import authUserReducer from './reducer';

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;

    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should return authUser when given SET_AUTH_USER action', () => {
    const initialState = null;

    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-1',
          name: 'Arya',
          email: 'arya@test.com',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'user-1',
      name: 'Arya',
      email: 'arya@test.com',
    };

    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(null);
  });
});