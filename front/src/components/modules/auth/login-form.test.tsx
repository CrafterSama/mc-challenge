import { describe, expect, test } from 'vitest';

import { renderWithProviders } from '@/hoc/render-with-providers';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './login-form';

describe('Login Form', () => {
  test('se renderiza el input para email', () => {
    renderWithProviders(<LoginForm />);
    const input = screen.getByPlaceholderText(/admin@example.com/i);
    expect(input).not.toBeNull();
  });
  test('se renderiza el input para password', () => {
    renderWithProviders(<LoginForm />);
    const input = screen.getByPlaceholderText(/password/i);
    expect(input).not.toBeNull();
  });
  test('se renderiza el boton para hacer submit', () => {
    renderWithProviders(<LoginForm />);
    const input = screen.getByRole('button', { name: /Login/i });
    expect(input).not.toBeNull();
  });
  test('Llama al submit con email y password', () => {
    renderWithProviders(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/admin@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);
  });
});
