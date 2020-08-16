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
  const [status, setStatus] = React.useState(Statuses.IN_PROGRESS);
  const deck = Deck.useContainer();
  const dealer = Players[0].useContainer();
  const player = Players[1].useContainer();

  React.useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // Start the game with 2 cards
    let [cards1, cards2] = await Promise.all([deck.takeCards(2), deck.takeCards()]);
    player.add(...cards1);
    dealer.add(...cards2);
  };

  const hit = async () => {
    if (isEnded()) return;

    const cards = await deck.takeCards();
    const score = player.add(...cards);
    if (score > Number(process.env.REACT_APP_MAX_SCORE)) {
      setStatus(Statuses.LOSS);
    }
  };

  const stick = async () => {
    if (isEnded()) return;

    // @todo Remove test
    const cards = await deck.takeCards();
    dealer.add(...cards);
  };

  const isEnded = () => status !== Statuses.IN_PROGRESS;

  const isLoss = () => status === Statuses.LOSS;

  const isWin = () => status === Statuses.WIN;

  const restart = () => {
    // @todo
    window.location.reload();
  };

  return {
    dealer, player,
    hit, stick, isEnded, isLoss, isWin, restart,
  };
}

export default Unstated.createContainer(useGame);
