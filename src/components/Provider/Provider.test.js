import React from 'react';
import { render } from '@testing-library/react'

import { Deck } from 'containers';

import Provider from './Provider';

test('Renders without crashing', async () => {
  render(<Provider containers={[Deck]} />);
});
