import { describe, it, expect, vi  } from 'vitest';
import {
  asyncPopulateThreads,
  asyncAddThread,
  asyncDeleteThread,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  deleteThreadActionCreator
} from './action';

import api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

vi.mock('../../utils/api', () => ({
  default: {
    getPopulatedThreads: vi.fn(),
    createThread: vi.fn(),
    deleteThread: vi.fn(),
  },
}));

vi.mock('@dimasmds/react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('asyncPopulateThreads', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    const fakeThreads = [{ id: 'thread-1', title: 'Thread 1' }];

    api.getPopulatedThreads.mockResolvedValue(fakeThreads);

    const dispatch = vi.fn();

    await asyncPopulateThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getPopulatedThreads).toBeCalled();
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreads)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncAddThread', () => {
  it('should dispatch action correctly when create thread success', async () => {
    const fakeThread = {
      id: 'thread-1',
      title: 'Test',
      body: 'Test body',
      category: 'general',
    };

    api.createThread.mockResolvedValue(fakeThread);

    const dispatch = vi.fn();

    await asyncAddThread({
      title: 'Test',
      body: 'Test body',
      category: 'general',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createThread).toBeCalled();
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncDeleteThread', () => {
  it('should dispatch action correctly when delete success', async () => {
    const dispatch = vi.fn();

    api.deleteThread.mockResolvedValue();

    await asyncDeleteThread('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.deleteThread).toBeCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(
      deleteThreadActionCreator('thread-1')
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});