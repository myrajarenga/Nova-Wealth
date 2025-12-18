import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

function renderNavbar(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );
}

test('renders key navigation links on desktop', () => {
  renderNavbar();

  expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /services/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /who we serve/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /about us/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /contact us/i }).length).toBeGreaterThan(0);
});

test('toggles mobile menu via the hamburger button', () => {
  renderNavbar();

  const toggleButton = screen.getByRole('button', {
    name: /toggle navigation menu/i,
  });

  expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  expect(document.getElementById('mobile-menu')).toBeNull();

  fireEvent.click(toggleButton);

  expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  expect(document.getElementById('mobile-menu')).not.toBeNull();
});
