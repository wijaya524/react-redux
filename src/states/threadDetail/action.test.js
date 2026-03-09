import { describe, it, expect, vi } from 'vitest';
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
} from './action';

import api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

vi.mock('../../utils/api', () => ({
  default: {
    getThreadDetail: vi.fn(),
    createComment: vi.fn(),
  },
}));

vi.mock('@dimasmds/react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('asyncReceiveThreadDetail', () => {
  it('should dispatch actions correctly when fetching success', async () => {
    const fakeThreadDetail = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [],
    };

    api.getThreadDetail.mockResolvedValue(fakeThreadDetail);

    const dispatch = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetail)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncCreateComment', () => {
  it('should dispatch action correctly when create comment success', async () => {
    const fakeComment = {
      id: 'comment-1',
      content: 'Test comment',
    };

    api.createComment.mockResolvedValue(fakeComment);

    const dispatch = vi.fn();

    await asyncCreateComment({
      threadId: 'thread-1',
      content: 'Test comment',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      content: 'Test comment',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_COMMENT',
      payload: { comment: fakeComment },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

