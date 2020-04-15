import React from "react";
import { ComposeMessageScreen } from "../ComposeMessageScreen";
import { create, act } from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import ReactTestRenderer from "react-test-renderer";
import { gql } from "apollo-boost";

it("should render without error", () => {
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

it("should render without error", () => {
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
