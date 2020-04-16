import ApolloClient from "apollo-boost";
import { AsyncStorage } from "react-native";

let token;
AsyncStorage.getItem("token")
  .then(value => (token = value))
  .catch(error => console.log(error));

const client = new ApolloClient({
  uri: "https://fierce-tundra-54482.herokuapp.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: token ? token : ""
      }
    });
  }
});

export default client;
