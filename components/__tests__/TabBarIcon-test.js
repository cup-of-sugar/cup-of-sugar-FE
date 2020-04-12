import React from 'react';
import TabBarIcon from '../TabBarIcon';
import { Ionicons } from '@expo/vector-icons';

import renderer from 'react-test-renderer';

test('should render component', () => {
  const props = {
    name: 'ios-add',
    focused: true,
  };
  const tree = renderer.create(<TabBarIcon {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render component', () => {
  const props = {
    name: 'ios-add',
    focused: false,
  };
  const tree = renderer.create(<TabBarIcon {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
