import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

test('can submit login form and proceed', async () => {
  render(
    <MemoryRouter>
      <AuthPage />
    </MemoryRouter>
  );
  const btn = screen.getByRole('button', { name: /sign in/i });
  fireEvent.click(btn);
  await waitFor(() => {
    // token should be set (from hook fallback)
    expect(localStorage.getItem('token')).toBeTruthy();
  });
});
