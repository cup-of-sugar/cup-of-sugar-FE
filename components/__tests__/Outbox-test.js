import React from "react";
import Outbox, { SENT_MESSAGES } from "../Outbox";

import { MockedProvider } from "@apollo/react-testing";
import ReactTestRenderer from "react-test-renderer";

it("should render component", async () => {
  const mocks = [
    {
      request: {
        query: SENT_MESSAGES,
      },
      result: {
        data: {
          userOutbox: [
            {
              title: "Tigers",
              body: "Still waiting on tigers",
              userId: "1",
              recipient: {
                id: "2",
                email: "carole@tigers.com",
                firstName: "Carole",
                lastName: "Baskin",
                __typename: "UserType",
              },
              __typename: "MessageType",
            },
          ],
        },
      },
    },
  ];

  const props = {
    navigation: { navigate: jest.fn() },
    userId: "2",
  };
  let tree = await ReactTestRenderer.create(
    <MockedProvider mocks={mocks}>
      <Outbox {...props} />
    </MockedProvider>
  );
  expect(tree).toMatchSnapshot();
});
