import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://fierce-tundra-54482.herokuapp.com/graphql",
});

export default client;
