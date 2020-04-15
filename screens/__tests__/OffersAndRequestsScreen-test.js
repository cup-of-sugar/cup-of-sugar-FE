import React from "react";
import OffersAndRequestsScreen, {
  REQUESTS,
  OFFERS,
} from "../OffersAndRequestsScreen";
import { create, act } from "react-test-renderer";

import { MockedProvider } from "@apollo/react-testing";

test("should render component", async () => {
  const mocks = [
    {
      request: {
        query: REQUESTS,
      },
      result: {
        data: {
          itemsUserLookingToBorrow: [
            {
              __typename: "ItemType",
              id: 1,
              name: "butter",
              measurement: 2,
              quantity: "sticks",
              timeDuration: null,
              category: {
                __typename: "CategoryType",
                name: "food",
              },
              description: "",
              available: true,
              posting: {
                __typename: "PostingType",
                title: "Gimme butter",
              },
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
  let tree;
  await act(async () => {
    tree = await create(
      <MockedProvider mocks={mocks}>
        <OffersAndRequestsScreen {...props} />
      </MockedProvider>
    );
  });
  expect(tree).toMatchSnapshot();
});

test("should render component", async () => {
  const mocks = [
    {
      request: {
        query: OFFERS,
      },
      result: {
        data: {
          itemsUserOfferedToLend: [
            {
              __typename: "ItemType",
              id: 1,
              name: "butter",
              measurement: 2,
              quantity: "sticks",
              timeDuration: null,
              category: {
                __typename: "CategoryType",
                name: "food",
              },
              description: "",
              available: true,
              posting: {
                title: "Gimme butter",
                __typename: "PostingType",
              },
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
  let tree;
  await act(async () => {
    tree = await create(
      <MockedProvider mocks={mocks}>
        <OffersAndRequestsScreen {...props} />
      </MockedProvider>
    );
  });
  expect(tree).toMatchSnapshot();
});
