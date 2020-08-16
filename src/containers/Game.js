import React from 'react';
// Always scope imports and avoid loose variables
import * as Unstated from 'unstated-next';

import { Deck, Players } from 'containers';

const Statuses = {
  IN_PROGRESS: 0,
  LOSS: 1,
  WIN: 2,
};

function useGame() {
  const [score, setScore] = React.useState(0);
  const [status, setStatus] = React.useState(Statuses.IN_PROGRESS);
  const deck = Deck.useContainer();
  const dealer = Players[0].useContainer();
  const player = Players[1].useContainer();

  React.useEffect(() => {
    // Start the game with 2 cards
    setScore(player.add(...deck.takeCards(2)));

    // @todo Remove test
    dealer.add(...deck.takeCards());
  }, []);

  const hit = () => {
    const sum = player.add(...deck.takeCards());
    setScore(sum);
    if (sum > Number(process.env.REACT_APP_MAX_SCORE)) {
      setStatus(Statuses.LOSS);
    }
  };

  const stick = () => {
    // @todo Remove test
    dealer.add(...deck.takeCards());
  };

  const isEnded = () => status !== Statuses.IN_PROGRESS;

  const isLoss = () => status === Statuses.LOSS;

  const isWin = () => status === Statuses.WIN;

  const restart = () => {
    // @todo
  };

  return {
    dealer, player, score,
    hit, stick, isEnded, isLoss, isWin, restart,
  };
}

export default Unstated.createContainer(useGame);
