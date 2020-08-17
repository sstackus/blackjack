import React from 'react';
import * as Unstated from 'unstated-next';

import { Deck } from 'containers';

export function usePlayer() {
  const [cards, setCards] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const deck = Deck.useContainer();

  const switchOneAce = React.useCallback(() => {
    const ace = cards.find(c => c.isUnswitchedAce());
    if (!ace) return false;
    ace.switchAce();

    return true;
  }, [cards]);

  const sum = React.useCallback(() => {
    let score;
    do {
      score = cards.reduce((acc, cur) => acc + cur.getValue(), 0);
    } while (score > process.env.REACT_APP_MAX_SCORE && switchOneAce());

    return score;
  }, [cards, switchOneAce]);

  const takeCard = (n = 1) => {
    setCards([...cards, ...deck.take(n)]);
  };

  React.useEffect(() => {
    setScore(sum());
  }, [sum]);

  return Object.defineProperty({
    score, takeCard,
  }, 'cards', {
    value: cards,
    writable: false,
    configurable: false,
  });
}

export default [
  Unstated.createContainer(usePlayer), // Dealer
  Unstated.createContainer(usePlayer), // Player 1
];
