import { describe, it } from 'vitest';
import threadDetailReducer from './reducer';

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {

  it('should return initial state when given unknown action', () => {
    const initialState = null;

    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should return threadDetail when given RECEIVE_THREAD_DETAIL action', () => {
    const initialState = null;

    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Title',
          body: 'Thread Body',
          comments: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [],
    };

    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBe(null);
  });

  it('should add new comment at the beginning when given ADD_COMMENT action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [
        { id: 'comment-1', content: 'Old comment' },
      ],
    };

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: { id: 'comment-2', content: 'New comment' },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0]).toEqual(action.payload.comment);
    expect(nextState.comments.length).toBe(2);
  });

});