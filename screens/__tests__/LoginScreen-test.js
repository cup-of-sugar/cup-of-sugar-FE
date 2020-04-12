import React from 'react';
import LoginScreen from '../LoginScreen';

import renderer from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

test('should render component', () => {
  const tree = renderer.create(<LoginScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
