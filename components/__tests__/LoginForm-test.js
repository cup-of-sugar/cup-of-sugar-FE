import React from "react";
import { LoginFormClass } from "../LoginForm";

import renderer, { act } from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";

it("should render component", async () => {
  const props = {
    navigation: { navigate: jest.fn() },
    userLogin: jest.fn(),
    action: "lend",
  };
  let tree;
  await act(async () => {
    tree = await renderer.create(
      <MockedProvider mocks={[]}>
        <LoginFormClass {...props} />
      </MockedProvider>
    );
  });
  expect(tree).toMatchSnapshot();
});
