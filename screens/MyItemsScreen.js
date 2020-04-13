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

export default function MyItemsScreen(props) {
  const navigation = useNavigation();
  const action = props.route.params.action;
  const userId = props.route.params.userId;

  const UPDATE_ITEM = gql`
    mutation {
      item: updateItemAvailability(
        input: { userId: "1", id: 13, available: false, name: "trowel" }
      ) {
        id
        available
        name
      }
    }
  `;

  const [updateItem] = useMutation(UPDATE_ITEM);

  const item = {
    name: "trowel",
    userId: userId,
    quantity: 13,
    measurement: null,
    timeDuration: "weeks"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemsMessage}>You are currently {action}ing:</Text>
      <ScrollView style={styles.itemsContainer}>
        <View style={styles.item}>
          <Text style={styles.itemName}>Trowel</Text>
          {action === "borrow" ? (
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => {
                updateItem() &&
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
          ) : (
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message Borrower</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
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
    width: 150
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
