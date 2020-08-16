import React from 'react';
// Always scope imports and avoid loose variables
import * as Unstated from 'unstated-next';

import { Deck, Player } from 'containers';

function useGame() {
  const [score, setScore] = React.useState(0);
  const deck = Deck.useContainer();
  const player = Player.useContainer();

  const hit = () => {
    setScore(player.add(...deck.takeCards()));
  };

  const stick = () => {

  };

  // Effects
  React.useEffect(() => {
    // Start the game with 2 cards
    setScore(player.add(...deck.takeCards(2)));
  }, []);

  return { hit, stick, score };
}

export default Unstated.createContainer(useGame);
