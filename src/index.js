import React from 'react';
import ReactDOM from 'react-dom';

import Table from 'components/Table/Table';
import Provider from 'components/Provider/Provider';
import { Deck, Players, Game } from 'containers';

import * as serviceWorker from './serviceWorker';

import './index.scss';

if (typeof process.env.REACT_APP_MAX_SCORE === 'undefined') {
  throw new ReferenceError('Environment variables not defined');
}

ReactDOM.render(
  <React.StrictMode>
    <Provider containers={[Deck, Players[0], Players[1], Game]}>
      <Table />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
