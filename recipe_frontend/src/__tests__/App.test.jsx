import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders navbar brand and Recipes heading on home route', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(await screen.findByText(/Recipe Explorer/i)).toBeInTheDocument();
  expect(await screen.findByText(/Recipes/i)).toBeInTheDocument();
});
