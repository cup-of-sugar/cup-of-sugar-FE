import React from 'react';
import ItemDetailsScreen from '../ItemDetailsScreen';

import renderer from 'react-test-renderer';

test('should render component', () => {
  const tree = renderer
    .create(
      <ItemDetailsScreen
        route={{
          params: {
            item: {
              name: 'butter',
              quantity: 4,
              measurement: 'oz',
              description: 'its buttah',
              category: { name: 'food' },
            },
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
