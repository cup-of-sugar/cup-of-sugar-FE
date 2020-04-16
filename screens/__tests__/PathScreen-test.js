import React from "react";
import PathScreen from "../PathScreen";

import renderer from "react-test-renderer";

test("should render component", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: { params: { token: 1 } }
  };
  const tree = renderer.create(<PathScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
