import React from 'react';
import { render } from 'testUtils';

import Card from './Card';
import Model from 'models/Card';

const card = new Model(Model.Suits[0], Model.Ranks[0]);

test('Renders without crashing', () => {
  render(<Card card={card} />);
});

test('Has styles', () => {
  const { container } = render(<Card card={card} />);
  expect(container.firstChild).toHaveClass('Card');
});
