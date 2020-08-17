import { renderHook, act } from '@testing-library/react-hooks';

import { useDeck } from '../Deck';

function setup() {
  const { result } = renderHook(() => useDeck());

  return result;
}

describe('Take card', () => {
  it('Gives correct number of cards from deck', () => {
    const result = setup();
    const takeCount = 5;
    let cards;
    act(() => {
      cards = result.current.take(takeCount);
    });
    expect(cards.length).toBe(takeCount);
  });

  it('Updates deck', async () => {
    const result = setup()
    const deckSize = result.current.cards.length;

    expect(result.current.cards.length).toBe(deckSize);

    act(() => {
      result.current.take();
    });

    expect(result.current.cards.length).toBe(deckSize - 1);
  });
});

describe('Empty deck', () => {
  it('Handles reaching 0 cards available', async () => {
    const result = setup()
    const deckSize = result.current.cards.length;

    act(() => {
      result.current.take(10);
    });

    expect(result.current.cards.length).toBe(deckSize - 10);

    let cards;
    act(() => {
      cards = result.current.take(Number.MAX_SAFE_INTEGER);
    });

    expect(result.current.cards.length).toBe(0);
    expect(cards.length).toBe(deckSize - 10);
  });

  it('Sets is empty value', () => {
    const result = setup();
    expect(result.current.isEmpty).toBe(false);

    act(() => {
      result.current.take(52);
    });

    expect(result.current.isEmpty).toBe(true);
  })
});

it('Initialises with full 52-card deck', () => {
  const result = setup();
  expect(result.current.cards.length).toBe(52);
});
