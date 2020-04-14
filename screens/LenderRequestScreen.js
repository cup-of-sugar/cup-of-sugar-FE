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
import { ScrollView } from "react-native-gesture-handler";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export default function LenderRequestScreen(props) {
  const navigation = props.navigation;
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

  const { loading, error, data } = useQuery(REQUESTS);

  if (loading) {
    return <Text style={styles.errorText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>No items found!</Text>;
  }

  if (data) {
    return (
      <View style={styles.container}>
        <Text style={styles.itemsMessage}>
          Items Neighbors Have Requested To Borrow:
        </Text>
        <ScrollView
          scrollIndicatorInsets={{ right: 1 }}
          style={styles.itemsContainer}
        >
          {data.itemsUserLookingToBorrow.length ? (
            data.itemsUserLookingToBorrow.map(item => {
              return (
                <View style={styles.item} key={item.id + item.name}>
                  <Text style={styles.itemName}>{item.name.toLowerCase()}</Text>
                  <TouchableOpacity style={styles.lendButton}>
                    <Text style={styles.lendButtonText}>Lend</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={styles.errorText}>No Requests Found</Text>
          )}
        </ScrollView>
      </View>
    );
  } else {
    <Text style={styles.errorText}>No Requests Found</Text>;
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
    overflow: "hidden",
    width: 330
  },
  itemName: {
    fontSize: 23,
    fontWeight: "bold",
    color: Colors.darkBlue,
    textAlign: "left"
  },
  lendButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    color: "#fff",
    height: 50,
    paddingTop: 12,
    width: 190
  },
  lendButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
