import React from 'react';

import Deck from 'components/Deck/Deck';
import Player from 'components/Player/Player';
import { Players } from 'containers';

import './Table.scss';

export default function Table() {
  return (
    <div className="Table">
      <Player className="Table__row" label="Dealer" container={Players[0]} />
      <Deck />
      <Player className="Table__row" container={Players[1]} />
    </div>
  );
}
