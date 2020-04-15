import React from "react";
import OffersAndRequestsScreen, {
  REQUESTS,
  OFFERS,
} from "../OffersAndRequestsScreen";
import ReactTestRenderer from "react-test-renderer";

import { MockedProvider } from "@apollo/react-testing";

test("should render component", () => {
  const mocks = [
    {
      request: {
        query: REQUESTS,
      },
      result: {
        data: {
          itemsUserLookingToBorrow: [
            {
              id: 1,
              name: "butter",
              measurement: 2,
              quantity: "sticks",
              timeDuration: null,
            },
          ],
        },
      },
    },
  ];
  const props = {
    navigation: { navigate: jest.fn() },
    route: { params: { action: "borrow" } },
  };
  const tree = ReactTestRenderer.create(
    <MockedProvider mocks={mocks} addTypeName={false}>
      <OffersAndRequestsScreen {...props} />
    </MockedProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("should render component", () => {
  const mocks = [
    {
      request: {
        query: OFFERS,
      },
      result: {
        data: {
          itemsUserOfferedToLend: [
            {
              id: 1,
              name: "butter",
              measurement: 2,
              quantity: "sticks",
              timeDuration: null,
            },
          ],
        },
      },
    },
  ];
  const props = {
    navigation: { navigate: jest.fn() },
    route: { params: { action: "lend" } },
  };
  const tree = ReactTestRenderer.create(
    <MockedProvider mocks={mocks} addTypeName={false}>
      <OffersAndRequestsScreen {...props} />
    </MockedProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
