import React from 'react';
import PropTypes from 'prop-types';

import Card from 'models/Card';

import './Card.scss';

export default function({ card, className }) {
  const rankName = card.getRankName();
  const suit = card.getSuit();
  const filename = `${rankName}_of_${suit}.svg`;

  return (
    <div className={`Card Card--${suit} Card--${rankName} ${className}`}>
      <img className="Card__image" src={`images/cards/${filename}`} alt={`${rankName} of ${suit}`} />
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  card: PropTypes.instanceOf(Card).isRequired,
};

Card.defaultProps = {
  className: '',
};

