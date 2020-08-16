import React from 'react';

import Dealer from 'components/Dealer/Dealer';
import Deck from 'components/Deck/Deck';
import Player from 'components/Player/Player';

import './Table.scss';

export default function Table() {
  return (
    <div className="Table">
      <Dealer className="Table__row" />
      <Deck />
      <Player className="Table__row" />
    </div>
  );
}
