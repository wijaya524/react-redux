import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput'; // Sesuaikan path-nya


describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Enter your full name');

    // Action
    await userEvent.type(nameInput, 'Aryansyah Yudha');

    // Assert
    expect(nameInput.value).toBe('Aryansyah Yudha');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Input your email');

    // Action
    await userEvent.type(emailInput, 'ryan@example.com');

    // Assert
    expect(emailInput.value).toBe('ryan@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Create a strong password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call register function with correct arguments when form is submitted', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    
    const nameInput = await screen.getByPlaceholderText('Enter your full name');
    const emailInput = await screen.getByPlaceholderText('Input your email');
    const passwordInput = await screen.getByPlaceholderText('Create a strong password');
    const registerButton = await screen.getByRole('button', { name: /create account/i });

    // Action
    await userEvent.type(nameInput, 'Aryansyah Yudha');
    await userEvent.type(emailInput, 'ryan@example.com');
    await userEvent.type(passwordInput, 'secret123');
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'Aryansyah Yudha',
      email: 'ryan@example.com',
      password: 'secret123',
    });
  });
});