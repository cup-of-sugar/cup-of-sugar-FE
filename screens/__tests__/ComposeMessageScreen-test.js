import React from "react";
import ComposeMessageScreen from "../ComposeMessageScreen";
import { MockedProvider } from "@apollo/react-testing";
import ReactTestRenderer from "react-test-renderer";

it("should render without error if on borrowing path", async () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: {
      params: {
        action: "borrow",
        recipient: { firstName: "Carole", email: "carole@tigers.com" }
      }
    }
  };
  let tree = await ReactTestRenderer.create(
    <MockedProvider mocks={[]}>
      <ComposeMessageScreen {...props} />
    </MockedProvider>
  );

  expect(tree).toMatchSnapshot();
});

it("should render without error if on lending path", async () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: {
      params: {
        action: "lend",
        recipient: { firstName: "Carole", email: "carole@tigers.com" }
      }
    }
  };
  let tree = await ReactTestRenderer.create(
    <MockedProvider mocks={[]}>
      <ComposeMessageScreen {...props} />
    </MockedProvider>
  );

  expect(tree).toMatchSnapshot();
});
