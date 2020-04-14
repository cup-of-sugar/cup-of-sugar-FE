import React from "react";
import ComposeMessageScreen from "../ComposeMessageScreen";

import renderer from "react-test-renderer";
import ReactTestRenderer from "react-test-renderer";

test("should render component", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    action: "borrow",
  };
  const tree = renderer.create(<ComposeMessageScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
