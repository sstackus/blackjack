import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/Card/Card';

import './Player.scss';

export default function Player({ className, label, container }) {
  const player = container.useContainer();

  return (
    <div className={`Player ${className}`}>
      {label && (
        <div className="Player__label">
          {label}
        </div>
      )}

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
  label: PropTypes.string,
};

Player.defaultProps = {
  className: '',
  label: null,
};

