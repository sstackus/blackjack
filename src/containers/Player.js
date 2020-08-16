import React from 'react';
import * as Unstated from 'unstated-next';

function usePlayer() {
  const [cards, setCards] = React.useState([]);

  const has = (card) => cards.includes(card);
  const add = (...newCards) => {
    const _cards = [...cards, ...newCards];
    setCards(_cards);

    return sum(_cards);
  };
  const sum = (_cards = cards) => _cards.reduce((acc, cur) => acc + cur.getValue(), 0);

  return Object.defineProperty({
    has, add, sum,
  }, 'cards', {
    value: cards,
    writable: false,
    configurable: false,
  });
}

export default Unstated.createContainer(usePlayer);
