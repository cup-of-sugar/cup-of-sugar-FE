import React from "react";
import { LoginFormClass } from "../LoginForm";

import renderer from "react-test-renderer";

test("should render component", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    userLogin: jest.fn(),
    action: "lend",
  };
  const tree = renderer.create(<LoginFormClass {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
