import React from 'react';
import { render, getByTestId } from 'testUtils';

import Deck from './Deck';

test('Renders without crashing', () => {
  render(<Deck />);
});

test('Has styles', () => {
  const { container } = render(<Deck />);
  expect(container.firstChild).toHaveClass('Deck');
});

test('Has "Hit" and "Stick" buttons', () => {
  const { getByText } = render(<Deck />);
  expect(getByText('Hit')).toBeInTheDocument();
  expect(getByText('Stick')).toBeInTheDocument();
});

test('Shows dealer and player scores', async () => {
  const { container } = render(<Deck />);
  expect(getByTestId(container, 'dealer-score')).toBeTruthy();
  expect(getByTestId(container, 'player-score')).toBeTruthy();
});
