import React from "react";
import ComposeMessageScreen, { ComposeForm } from "../ComposeMessageScreen";

import ReactTestRenderer from "react-test-renderer";

test("should render component", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    action: "borrow",
  };
  const tree = ReactTestRenderer.create(
    <ComposeMessageScreen {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("should render component", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    action: "borrow",
  };
  const tree = ReactTestRenderer.create(<ComposeForm {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
