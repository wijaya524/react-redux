import { describe, it, expect, vi } from 'vitest';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

global.alert = vi.fn();

import api from '../../utils/api';

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    getOwnProfile: vi.fn(),
    putAccessToken: vi.fn(),
  },
}));

describe('asyncSetAuthUser', () => {
  it('should dispatch auth user correctly when login success', async () => {
    const fakeToken = 'token-123';
    const fakeUser = { id: 'user-1', name: 'John' };

    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    const result = await asyncSetAuthUser({
      email: 'john@mail.com',
      password: '123456',
    })(dispatch);

    expect(api.login).toHaveBeenCalledWith({
      email: 'john@mail.com',
      password: '123456',
    });

    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);

    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeUser)
    );

    expect(result).toBe(true);
  });
});

it('should return false when login failed', async () => {
  api.login.mockRejectedValue(new Error('Login failed'));

  const dispatch = vi.fn();

  const result = await asyncSetAuthUser({
    email: 'john@mail.com',
    password: '123456',
  })(dispatch);

  expect(result).toBe(false);
});

describe('asyncUnsetAuthUser', () => {
  it('should dispatch unset auth user correctly', () => {
    const dispatch = vi.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      unsetAuthUserActionCreator()
    );

    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});