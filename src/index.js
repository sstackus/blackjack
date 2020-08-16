import React from 'react';
import ReactDOM from 'react-dom';

import Table from 'components/Table/Table';
import * as Containers from 'containers';

import * as serviceWorker from './serviceWorker';

import './index.scss';

if (typeof process.env.REACT_APP_MAX_SCORE === 'undefined') {
  throw new ReferenceError('Environment variables not defined');
}

ReactDOM.render(
  <React.StrictMode>
    <Containers.Deck.Provider>
      <Containers.Player.Provider>
        <Containers.Game.Provider>
          <Table />
        </Containers.Game.Provider>
      </Containers.Player.Provider>
    </Containers.Deck.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
