import React from "react";
import ComposeMessageScreen from "../ComposeMessageScreen";
import { MockedProvider } from "@apollo/react-testing";
import ReactTestRenderer from "react-test-renderer";

it("should render without error if on borrowing path", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: { params: { action: "borrow", userId: "4" } }
  };
  ReactTestRenderer.create(
    <MockedProvider mocks={[]}>
      <ComposeMessageScreen {...props} />
    </MockedProvider>
  );
});

it("should render without error if on lending path", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: { params: { action: "lend", userId: "4" } }
  };
  ReactTestRenderer.create(
    <MockedProvider mocks={[]}>
      <ComposeMessageScreen {...props} />
    </MockedProvider>
  );
});
