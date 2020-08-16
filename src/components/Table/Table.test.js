import React from 'react';
import { render } from 'testUtils';

import Table from './Table';

test('Renders without crashing', () => {
  render(<Table />);
});

test('Has styles', () => {
  const { container } = render(<Table />);
  expect(container.firstChild).toHaveClass('Table');
});
