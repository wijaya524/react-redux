

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput'; 


describe('LoginInput component', () => {
  // Membersihkan DOM setelah setiap test
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Enter your email');

    // Action
    await userEvent.type(emailInput, 'test@gmail.com');

    // Assert
    expect(emailInput.value).toBe('test@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Enter your password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call login function with correct arguments when button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn(); // Membuat fungsi tiruan (mock)
    render(<LoginInput login={mockLogin} />);
    
    const emailInput = await screen.getByPlaceholderText('Enter your email');
    const passwordInput = await screen.getByPlaceholderText('Enter your password');
    const loginButton = await screen.getByRole('button', { name: /sign in/i });

    // Action
    await userEvent.type(emailInput, 'ryan@example.com');
    await userEvent.type(passwordInput, 'secret123');
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'ryan@example.com',
      password: 'secret123',
    });
  });
});