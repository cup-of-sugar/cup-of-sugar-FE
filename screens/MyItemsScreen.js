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

  if (action === "borrow") {
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

    if (loading) {
      return <Text style={styles.errorText}>Loading...</Text>;
    }

    if (error) {
      return <Text style={styles.errorText}>No items found!</Text>;
    }

    if (data) {
      return (
        <View style={styles.container}>
          <Text style={styles.itemsMessage}>You are currently borrowing:</Text>
          <ScrollView
            scrollIndicatorInsets={{ right: 1 }}
            style={styles.itemsContainer}
          >
            {data.itemsUserHasBorrowed.length ? (
              data.itemsUserHasBorrowed.map(item => {
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
            ) : (
              <Text style={styles.errorText}>
                You're not borrowing any items currently!
              </Text>
            )}
          </ScrollView>
        </View>
      );
    }
  } else if (action === "lend") {
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

    const { loading, error, data } = useQuery(LOANED_ITEMS);

    if (loading) {
      return <Text style={styles.errorText}>Loading...</Text>;
    }

    if (error) {
      return <Text style={styles.errorText}>No items found!</Text>;
    }

    if (data) {
      return (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.itemsMessage}>
              Tap{" "}
              <Text style={{ fontWeight: "bold", color: Colors.darkBlue }}>
                Message
              </Text>{" "}
              to contact the neighbor currently borrowing your item.
            </Text>
            <Text style={styles.itemsMessage}>You are currently lending:</Text>
          </View>
          <ScrollView
            scrollIndicatorInsets={{ right: 1 }}
            style={styles.itemsContainer}
          >
            {data.itemsUserHasLent.length ? (
              data.itemsUserHasLent.map(item => {
                return (
                  <View style={styles.item} key={item.id + item.name}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.messageButton}
                      onPress={() =>
                        props.navigation.navigate("Compose", { action, userId })
                      }
                    >
                      <Text style={styles.messageButtonText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text style={styles.errorText}>
                You're not loaning any items yet!
              </Text>
            )}
          </ScrollView>
        </View>
      );
    }
  } else {
    <Text style={styles.errorText}>Nothing found!</Text>;
  }
}

const styles = StyleSheet.create({
  errorText: {
    alignSelf: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  itemsContainer: {
    flex: 1
  },
  infoContainer: {
    alignItems: "center",
    flex: 0
  },
  itemsMessage: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    lineHeight: 32,
    margin: 15,
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
    width: 360
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
    paddingTop: 8,
    width: 115
  },
  messageButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
