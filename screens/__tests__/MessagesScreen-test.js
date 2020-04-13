import React from 'react';
import MessagesScreen from '../MessagesScreen';

import renderer from 'react-test-renderer';

test('should render component', () => {
  const props = { navigation: { navigate: jest.fn() } };
  const tree = renderer.create(<MessagesScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
