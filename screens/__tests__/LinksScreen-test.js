import React from 'react';
import LinksScreen from '../LinksScreen';

import renderer from 'react-test-renderer';

test('should render component', () => {
  const tree = renderer.create(<LinksScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
