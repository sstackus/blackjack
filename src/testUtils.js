import React from 'react'
import { render } from '@testing-library/react'

import { Deck, Players, Game } from 'containers';

const Providers = ({ children }) => {
  const [Player0, Player1] = Players;

  return (
    <Deck.Provider>
      <Player0.Provider>
        <Player1.Provider>
          <Game.Provider>
            {children}
          </Game.Provider>
        </Player1.Provider>
      </Player0.Provider>
    </Deck.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react'
export { customRender as render }
