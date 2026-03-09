import { describe, it } from 'vitest';
import isPreloadReducer from './reducer';

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = true;

    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should return isPreload value when given SET_IS_PRELOAD action', () => {
    const initialState = true;

    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(action.payload.isPreload);
  });
});