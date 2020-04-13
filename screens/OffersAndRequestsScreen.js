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
import { useQuery } from "@apollo/react-hooks";

export default function OffersAndRequestsScreen(props) {
  const navigation = useNavigation();
  const action = props.route.params.action;
  const userId = props.route.params.userId;
  let id, available, name;

  const REQUESTS = gql`
    query {
      itemsUserLookingToBorrow(userId: "1") {
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

  const { load, err, info } = useQuery(REQUESTS);

  const OFFERS = gql`
    query {
      itemsUserOfferedToLend(userId: "1") {
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

  const { loading, error, data } = useQuery(OFFERS);

  if (loading || load) {
    return <Text>Loading...</Text>;
  }

  if (error || err) {
    return <Text>No items found!</Text>;
  }

  if (data || info) {
    return (
      <View style={styles.container}>
        <Text style={styles.itemsMessage}>
          {action === "borrow"
            ? "Items I've Requested"
            : "Items I'm Offering To Loan"}
          :
        </Text>
        <ScrollView style={styles.itemsContainer}>
          {action === "borrow"
            ? info.itemsUserLookingToBorrow.map(item => {
                return (
                  <View style={styles.item} key={item.id + item.name}>
                    <Text style={styles.itemName}>
                      {item.name.toLowerCase()}
                    </Text>
                    <Text style={styles.itemName}>
                      {item.measurement
                        ? item.quantity + " " + item.measurement
                        : item.quantity &&
                          item.timeDuration &&
                          !item.timeDuration.includes(item.quantity)
                        ? item.quantity + " " + item.timeDuration
                        : item.timeDuration || item.quantity}
                    </Text>
                  </View>
                );
              })
            : data.itemsUserOfferedToLend.map(item => {
                return (
                  <View style={styles.item} key={item.id + item.name}>
                    <Text style={styles.itemName}>
                      {item.name.toLowerCase()}
                    </Text>
                    <Text style={styles.itemName}>
                      {item.measurement
                        ? item.quantity + " " + item.measurement
                        : item.quantity &&
                          item.timeDuration &&
                          !item.timeDuration.includes(item.quantity)
                        ? item.quantity + " " + item.timeDuration
                        : item.timeDuration || item.quantity}
                    </Text>
                  </View>
                );
              })}
        </ScrollView>
      </View>
    );
  } else {
    <Text>An error has occurred! Try again later.</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
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
