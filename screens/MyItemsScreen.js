import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";

export default function MyItemsScreen(props) {
  const navigation = useNavigation();
  const action = props.route.params.action;
  const userId = props.route.params.userId;
  let id, available, name;

  const UPDATE_ITEM = gql`
    mutation UpdateItemAvailability(
      $id: ID!
      $available: Boolean!
      $name: String!
    ) {
      item: updateItemAvailability(
        input: { userId: "1", id: $id, available: $available, name: $name }
      ) {
        id
        available
        name
      }
    }
  `;

  const [updateItem] = useMutation(UPDATE_ITEM, {
    variables: {
      id,
      available,
      name
    },
    refetchQueries: () => [
      {
        query: BORROWED_ITEMS,
        variables: {
          userId: "1"
        }
      }
    ]
  });

  const BORROWED_ITEMS = gql`
    query {
      itemsUserHasBorrowed(userId: "1") {
        id
        name
        quantity
        available
        description
        measurement
        timeDuration
        posting {
          title
        }
        category {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(BORROWED_ITEMS);

  const LOANED_ITEMS = gql`
    query {
      itemsUserHasLent(userId: "1") {
        id
        name
        quantity
        available
        description
        measurement
        timeDuration
        posting {
          title
        }
        category {
          name
        }
      }
    }
  `;

  const { load, err, info } = useQuery(LOANED_ITEMS);

  if (loading || load) {
    return <Text>Loading...</Text>;
  }

  if (error || err) {
    return <Text>No items found!</Text>;
  }

  if (data || info) {
    return (
      <View style={styles.container}>
        <Text style={styles.itemsMessage}>You are currently {action}ing:</Text>
        <ScrollView
          scrollIndicatorInsets={{ right: 1 }}
          style={styles.itemsContainer}
        >
          {action === "borrow"
            ? data.itemsUserHasBorrowed.map(item => {
                return !item.available ? (
                  <View style={styles.item} key={item.id + item.name}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {item.category.name !== "Food" ? (
                      <TouchableOpacity
                        style={styles.returnButton}
                        onPress={() => {
                          updateItem({
                            variables: {
                              id: item.id,
                              available: item.available,
                              name: item.name
                            }
                          }) &&
                            navigation.navigate("Success!", {
                              action: "return",
                              userId: userId,
                              name: item.name,
                              quantity: item.quantity,
                              measurement: item.measurement,
                              timeDuration: item.timeDuration
                            });
                        }}
                      >
                        <Text style={styles.returnButtonText}>Return</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null;
              })
            : info.itemsUserHasLent.map(item => {
                return (
                  <View style={styles.item} key={item.id + item.name}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.returnButton}
                      onPress={() => {
                        updateItem({
                          variables: {
                            id: item.id,
                            available: item.available,
                            name: item.name
                          }
                        }) &&
                          navigation.navigate("Success!", {
                            action: "return",
                            userId: userId,
                            name: item.name,
                            quantity: item.quantity,
                            measurement: item.measurement,
                            timeDuration: item.timeDuration
                          });
                      }}
                    >
                      <Text style={styles.messageButtonText}>
                        Message Borrower
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80
  },
  itemsContainer: {
    flex: 1
  },
  itemsMessage: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    lineHeight: 35,
    margin: 20,
    textAlign: "center"
  },
  item: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.aqua,
    borderRadius: 7,
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 20,
    height: 70,
    width: 330
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.darkBlue,
    textAlign: "left"
  },
  returnButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    color: "#fff",
    height: 50,
    paddingTop: 10,
    width: 100
  },
  returnButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  messageButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    color: "#fff",
    height: 50,
    paddingTop: 12,
    width: 190
  },
  messageButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
