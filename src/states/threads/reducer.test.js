import { describe, it } from 'vitest';
import threadsReducer from './reducer';

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {

  it('should return initial state when given unknown action', () => {
    const initialState = [];

    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should return threads when given RECEIVE_THREADS action', () => {
    const initialState = [];

    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread 1' },
          { id: 'thread-2', title: 'Thread 2' },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should add new thread at the beginning when given ADD_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1' },
    ];

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: { id: 'thread-2', title: 'Thread 2' },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0]).toEqual(action.payload.thread);
    expect(nextState.length).toBe(2);
  });

  it('should remove thread when given DELETE_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1' },
      { id: 'thread-2', title: 'Thread 2' },
    ];

    const action = {
      type: ActionType.DELETE_THREAD,
      payload: {
        threadId: 'thread-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      { id: 'thread-2', title: 'Thread 2' },
    ]);
  });

  it('should update thread when given UPDATE_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', body: 'Old body' },
      { id: 'thread-2', title: 'Thread 2', body: 'Body 2' },
    ];

    const action = {
      type: ActionType.UPDATE_THREAD,
      payload: {
        thread: {
          id: 'thread-1',
          title: 'Thread 1 Updated',
          body: 'New body',
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0]).toEqual({
      id: 'thread-1',
      title: 'Thread 1 Updated',
      body: 'New body',
    });
  });

});