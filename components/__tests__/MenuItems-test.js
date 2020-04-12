import React from 'react';
import MenuItem from '../MenuDrawer';

import renderer from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';

test('should render component', () => {
  const props = {
    closeMenu: jest.fn(),
    action: 'lend',
  };
  const tree = renderer.create(<MenuItem {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
