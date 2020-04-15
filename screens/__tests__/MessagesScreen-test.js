import React from "react";
import MessagesScreen from "../MessagesScreen";
import { MockedProvider } from "@apollo/react-testing";
import ReactTestRenderer, { act } from "react-test-renderer";

it("should render without error if on borrowing path", async () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: { params: { action: "borrow", userId: "4" } },
  };
  let tree;
  await act(async () => {
    tree = await ReactTestRenderer.create(
      <MockedProvider mocks={[]}>
        <MessagesScreen {...props} />
      </MockedProvider>
    );
  });
  expect(tree).toMatchSnapshot();
});

it("should render without error if on lending path", async () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: { params: { action: "lend", userId: "4" } },
  };
  let tree;
  await act(async () => {
    tree = await ReactTestRenderer.create(
      <MockedProvider mocks={[]}>
        <MessagesScreen {...props} />
      </MockedProvider>
    );
  });
  expect(tree).toMatchSnapshot();
});
