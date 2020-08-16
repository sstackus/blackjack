import React from 'react';

import Deck from 'components/Deck/Deck';
import Player from 'components/Player/Player';
import { Game, Players } from 'containers';

import './Table.scss';

export default function Table() {
  const game = Game.useContainer();

  return (
    <div
      className={`Table
        ${game.isWin() && 'Table--win'}
        ${game.isLoss() && 'Table--loss'}
        ${game.isDraw() && 'Table--draw'}`}
      >
      <Player className="Table__row" label="Dealer" container={Players[0]} />
      <Deck />
      <Player className="Table__row" container={Players[1]} />
    </div>
  );
}
