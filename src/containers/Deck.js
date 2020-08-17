import React from 'react';
import * as Unstated from 'unstated-next';

import Card from 'models/Card';

function generateDeck() {
  const cards = [];

  for (let s = 0; s < Card.Suits.length; s++) {
    for (let r = 0; r < Card.Ranks.length; r++) {
      cards.push(new Card(Card.Suits[s], Card.Ranks[r]));
    }
  }

  return shuffle(cards);
}

function shuffle(cards) {
  const _cards = [...cards];

  for (let i = _cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_cards[i], _cards[j]] = [_cards[j], _cards[i]];
  }

  return _cards;
}

const initialDeck = generateDeck();

export function useDeck() {
  const [deck, setDeck] = React.useState(initialDeck);
  const [isEmpty, setEmpty] = React.useState(false);

  React.useEffect(() => {
    if (deck.length < 1) {
      setEmpty(true);
    }
  }, [deck]);

  const take = (n = 1) => {
    const _deck = [...deck]; // No mutation
    const cards = [];

    for (let i = 0; i < n; i++) {
      const card = _deck.shift();

      // Can't take another card, deck is empty!
      if (typeof card === 'undefined') break;

      cards.push(card);
    }

    setDeck(_deck);

    return cards;
  };

  return { cards: deck, take, isEmpty };
}

export default Unstated.createContainer(useDeck);
