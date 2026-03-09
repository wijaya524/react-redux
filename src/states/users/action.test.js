import { describe, it, expect, vi } from 'vitest';
import { asyncRegisterUser } from './action';
import api from '../../utils/api';

global.alert = vi.fn();

// membuat mock dari module api
vi.mock('../../utils/api', () => ({
  default: {
    register: vi.fn(),
  },
}));

describe('asyncRegisterUser', () => {
  it('should return true when register success', async () => {
    // mock berhasil
    api.register.mockResolvedValueOnce();

    const register = asyncRegisterUser({
      name: 'John',
      email: 'john@mail.com',
      password: '123456',
    });

    const result = await register();

    expect(api.register).toBeCalledWith({
      name: 'John',
      email: 'john@mail.com',
      password: '123456',
    });

    expect(result).toBe(true);
  });

  it('should return false when register failed', async () => {
    // mock gagal
    api.register.mockRejectedValueOnce(new Error('Register failed'));

    const register = asyncRegisterUser({
      name: 'John',
      email: 'john@mail.com',
      password: '123456',
    });

    const result = await register();

    expect(result).toBe(false);
  });
});