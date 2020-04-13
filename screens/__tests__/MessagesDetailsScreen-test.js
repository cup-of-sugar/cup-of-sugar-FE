import React from 'react';
import MessageDetailsScreen from '../MessageDetailsScreen';

import renderer from 'react-test-renderer';

test('should render component', () => {
  const tree = renderer.create(<MessageDetailsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
