import React from 'react';

import { Game } from 'containers';

import './Deck.scss';

export default function Deck() {
  const game = Game.useContainer();

  return (
    <div className="Deck">
      <div className="Deck__buttons">
        <button
          className="Deck__button"
          type="button"
          onClick={() => game.hit()}
          disabled={game.isOver}
        >
          <span>Hit</span>
        </button>

        <button
          className="Deck__button"
          type="button"
          onClick={() => game.stick()}
          disabled={game.isOver}
        >
          <span>Stick</span>
        </button>
      </div>

      <strong className={`Deck__score ${game.isOver && 'Deck__score--game-over'}`}>
        {game.score}
      </strong>
    </div>
  );
}
