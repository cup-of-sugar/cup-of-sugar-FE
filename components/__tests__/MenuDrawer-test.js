import React from 'react';
import MenuDrawer from '../MenuDrawer';

import renderer from 'react-test-renderer';

test('should render component', () => {
  const tree = renderer.create(<MenuDrawer />).toJSON();
  expect(tree).toMatchSnapshot();
});
