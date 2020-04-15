import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";

export const REQUESTS = gql`
  query ItemsUserLookingToBorrow($userId: ID!) {
    itemsUserLookingToBorrow(userId: $userId) {
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

export const OFFERS = gql`
  query ItemsUserOfferedToLend($userId: ID!) {
    itemsUserOfferedToLend(userId: $userId) {
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

export default function OffersAndRequestsScreen(props) {
  const navigation = props.navigation;
  const action = props.route.params.action;
  const userId = props.route.params.userId;

  if (action === "borrow") {
    const { loading, error, data } = useQuery(REQUESTS, {
      variables: {
        userId: userId
      }
    });

    if (loading) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
      return <Text style={styles.errorText}>No items found!</Text>;
    }

    if (data) {
      return (
        <View style={styles.container}>
          <Text style={styles.itemsMessage}>Items I've Requested:</Text>
          <ScrollView
            scrollIndicatorInsets={{ right: 1 }}
            style={styles.itemsContainer}
          >
            {data.itemsUserLookingToBorrow.length ? (
              data.itemsUserLookingToBorrow.map(item => {
                return (
                  <View style={styles.item} key={item.id + item.name}>
                    <Text style={styles.itemName}>
                      {item.name.toLowerCase()}
                    </Text>
                    <Text style={styles.itemName}>
                      {item.measurement
                        ? item.quantity + " " + item.measurement
                        : item.quantity && item.timeDuration
                        ? item.timeDuration
                        : item.quantity}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.errorText}>No Requests Found</Text>
            )}
          </ScrollView>
        </View>
      );
    }
  } else if (action === "lend") {
    const { loading, error, data } = useQuery(OFFERS, {
      variables: {
        userId: userId
      }
    });
    let id;

    const DELETE_ITEM = gql`
      mutation DeletePosting($id: ID!) {
        posting: deletePosting(input: { id: $id }) {
          title
        }
      }
    `;

    let [deleteItem] = useMutation(DELETE_ITEM, {
      variables: {
        id
      },
      refetchQueries: () => [
        {
          query: OFFERS,
          variables: {
            userId: userId
          }
        }
      ]
    });

    const handleDelete = postingId => {
      deleteItem({
        variables: {
          id: postingId
        }
      }).catch(error => console.log(error));
    };

    if (loading) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
      return <Text style={styles.errorText}>No items found!</Text>;
    }

    if (data) {
      return (
        <View style={styles.container}>
          <Text style={styles.itemsMessage}>
            Items you have offered to lend that are not currently being
            borrowed:
          </Text>
          <ScrollView
            scrollIndicatorInsets={{ right: 1 }}
            style={styles.itemsContainer}
          >
            {data.itemsUserOfferedToLend.length ? (
              data.itemsUserOfferedToLend.map(item => {
                return item.available ? (
                  <View style={styles.item} key={item.id + item.name}>
                    <Text style={styles.itemName}>
                      {item.name.toLowerCase()},{" "}
                      {item.measurement
                        ? item.quantity + " " + item.measurement
                        : item.quantity && item.timeDuration
                        ? item.timeDuration
                        : item.timeDuration || item.quantity}
                    </Text>
                    <TouchableOpacity
                      style={styles.messageButton}
                      onPress={() => handleDelete(item.postingId || "1")}
                    >
                      <Text style={styles.messageButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ) : null;
              })
            ) : (
              <Text style={styles.errorText}>No Items Found!</Text>
            )}
          </ScrollView>
        </View>
      );
    }
  } else {
    return <Text style={styles.errorText}>No Items Found!</Text>;
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
  itemsMessage: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    lineHeight: 35,
    margin: 20,
    textAlign: "center",
    width: 380
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
    padding: 15,
    height: 70,
    overflow: "hidden",
    width: 370
  },
  itemName: {
    fontSize: 23,
    fontWeight: "bold",
    color: Colors.darkBlue,
    textAlign: "left",
    overflow: "hidden",
    width: 220
  },
  messageButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    color: "#fff",
    height: 50,
    paddingTop: 12,
    width: 100
  },
  messageButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  loadingText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});
