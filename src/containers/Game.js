import React from 'react';
// Always scope imports and avoid loose variables
import * as Unstated from 'unstated-next';

import { Players } from 'containers';

const Statuses = {
  IS_HITTING: 0,
  IS_STICKING: 1,
  LOSS: 2,
  WIN: 3,
  DRAW: 4,
};

export function useGame() {
  const [status, setStatus] = React.useState(Statuses.IS_HITTING);
  const dealer = Players[0].useContainer();
  const player = Players[1].useContainer();

  const hit = () => {
    if (isEnded()) return;
    player.takeCard();
  };

  const stick = () => {
    if (isEnded()) return;
    setStatus(Statuses.IS_STICKING);
  };

  const goDealer = () => {
    if (isEnded()) return;
    dealer.takeCard();
  };

  const isLoss = React.useCallback(() => status === Statuses.LOSS, [status]);

  const isWin = React.useCallback(() => status === Statuses.WIN, [status]);

  const isDraw = React.useCallback(() => status === Statuses.DRAW, [status]);

  const isBusy = React.useCallback(() => status === Statuses.IS_STICKING, [status]);

  const isEnded = React.useCallback(() => isLoss() || isWin() || isDraw(), [isLoss, isWin, isDraw]);

  const restart = () => {
    // @todo
    window.location.reload();
  };

  React.useEffect(() => {
    // Start the game with 2 cards
    player.takeCard(2);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (status === Statuses.IS_STICKING) {
      if (dealer.score > process.env.REACT_APP_MAX_SCORE) {
        // Dealer loses
        setStatus(Statuses.WIN);
      } else if (dealer.score > player.score) {
        // Dealer wins
        setStatus(Statuses.LOSS);
      } else if (dealer.score === process.env.REACT_APP_MAX_SCORE && dealer.score === player.score) {
        setStatus(Statuses.DRAW);
      } else {
        goDealer();
      }
    }
  }, [status, dealer.score]);

  React.useEffect(() => {
    if (status === Statuses.IS_HITTING && player.score > process.env.REACT_APP_MAX_SCORE) {
      setStatus(Statuses.LOSS);
    }
  }, [status, player.score]);

  return {
    dealer, player,
    hit, stick, isEnded, isLoss, isWin, isDraw, isBusy, restart,
  };
}

export default Unstated.createContainer(useGame);
