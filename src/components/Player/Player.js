import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/Card/Card';
import { Player } from 'containers';

import './Player.scss';

export default function({ className }) {
  const player = Player.useContainer();

  return (
    <div className={`Player ${className}`}>
      {player.cards.map((card) => (
        <Card
          className="Player__card"
          card={card}
          key={card} // toString!
        />
      ))}
    </div>
  );
}

Player.propTypes = {
  className: PropTypes.string,
};

Player.defaultProps = {
  className: '',
};

