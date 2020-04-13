import React from 'react';
import SuccessScreen from '../SuccessScreen';

import renderer from 'react-test-renderer';

test('should render component', () => {
  const props = {
    route: {
      params: {
        action: 'borrow',
        name: 'butter',
        quantity: 1,
        measurement: 'oz',
        timeDuration: null,
      },
    },
  };
  const tree = renderer.create(<SuccessScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render component', () => {
  const props = {
    route: {
      params: {
        action: 'lend',
        name: 'butter',
        quantity: 1,
        measurement: 'oz',
        timeDuration: null,
      },
    },
  };
  const tree = renderer.create(<SuccessScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render component', () => {
  const props = {
    route: {
      params: {
        action: 'request',
        name: 'butter',
        quantity: 1,
        measurement: 'oz',
        timeDuration: null,
      },
    },
  };
  const tree = renderer.create(<SuccessScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render component', () => {
  const props = {
    route: {
      params: {
        action: 'return',
        name: 'butter',
        quantity: 1,
        measurement: 'oz',
        timeDuration: null,
      },
    },
  };
  const tree = renderer.create(<SuccessScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render component', () => {
  const props = {
    route: {
      params: {
        action: 'borrow',
        name: 'drill',
        quantity: 1,
        measurement: null,
        timeDuration: 'day',
      },
    },
  };
  const tree = renderer.create(<SuccessScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
