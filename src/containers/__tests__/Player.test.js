import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { usePlayer } from '../Players';
import { Deck } from 'containers';

function setup() {
  const wrapper = ({ children }) => (
    <Deck.Provider>{children}</Deck.Provider>
  );
  const { result } = renderHook(() => usePlayer(), { wrapper });

  return result;
}

it('Starts with a clean slate', () => {
  const result = setup();

  expect(result.current.cards).toBeInstanceOf(Array);
  expect(result.current.cards.length).toBe(0);
  expect(result.current.score).toBe(0);
});

it('Prevent mutations to cards', () => {
  const result = setup();
  const descriptor = Object.getOwnPropertyDescriptor(
    result.current, 'cards',
  );
  expect(descriptor.writable).toBe(false);
  expect(descriptor.configurable).toBe(false);
});

it('Allows taking a card from deck', () => {
  const result = setup();
  const takeCount = 3;
  act(() => {
    result.current.takeCard(takeCount);
  });
  expect(result.current.cards.length).toBe(takeCount);
});

it('Automatically updates score', () => {
  const result = setup();
  let { score } = result.current;

  // Update once
  act(() => {
    result.current.takeCard();
  });
  expect(result.current.score).toBeGreaterThan(score);

  ({ score } = result.current);

  // Update twice
  act(() => {
    result.current.takeCard();
  });
  expect(result.current.score).toBeGreaterThan(score);
});
