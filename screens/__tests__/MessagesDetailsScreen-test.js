import React from "react";
import MessageDetailsScreen from "../MessageDetailsScreen";
import { MockedProvider } from "@apollo/react-testing";
import ReactTestRenderer from "react-test-renderer";

it("should render without error if on borrowing path", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: {
      params: {
        action: "borrow",
        message: {
          title: "hi",
          body: "how are you",
          recipient: { firstName: "Carole" }
        }
      }
    }
  };
  ReactTestRenderer.create(
    <MockedProvider mocks={[]}>
      <MessageDetailsScreen {...props} />
    </MockedProvider>
  );
});

it("should render without error if on lending path", () => {
  const props = {
    navigation: { navigate: jest.fn() },
    route: {
      params: {
        action: "lend",
        message: {
          title: "hi",
          body: "how are you",
          recipient: { firstName: "Carole" }
        }
      }
    }
  };
  ReactTestRenderer.create(
    <MockedProvider mocks={[]}>
      <MessageDetailsScreen {...props} />
    </MockedProvider>
  );
});
