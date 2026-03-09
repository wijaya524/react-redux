import { describe, it, expect, vi } from 'vitest';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';
import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    getOwnProfile: vi.fn(),
  },
}));

vi.mock('../authUser/action', () => ({
  setAuthUserActionCreator: vi.fn((user) => ({
    type: 'SET_AUTH_USER',
    payload: { user },
  })),
}));

vi.mock('@dimasmds/react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('asyncPreloadProcess', () => {
  it('should dispatch actions correctly when API success', async () => {
    const fakeUser = { id: 'user-1', name: 'John' };

    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(api.getOwnProfile).toBeCalled();

    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeUser)
    );

    expect(dispatch).toHaveBeenCalledWith(
      setIsPreloadActionCreator(false)
    );
  });
});

it('should dispatch null user when API failed', async () => {
  api.getOwnProfile.mockRejectedValue(new Error('Failed'));

  const dispatch = vi.fn();

  await asyncPreloadProcess()(dispatch);

  expect(dispatch).toHaveBeenCalledWith(
    setAuthUserActionCreator(null)
  );

  expect(dispatch).toHaveBeenCalledWith(
    setIsPreloadActionCreator(false)
  );
});