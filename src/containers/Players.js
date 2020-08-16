import React from 'react';
import * as Unstated from 'unstated-next';

function usePlayer() {
  const [cards, setCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const has = (card) => cards.includes(card);
  const add = (...newCards) => {
    const _cards = [...cards, ...newCards];
    const _score = sum(_cards);
    setCards(_cards);
    setScore(_score);

    return _score;
  };
  const sum = (_cards = cards) => _cards.reduce((acc, cur) => acc + cur.getValue(), 0);

  return Object.defineProperty({
    has, add, score,
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
