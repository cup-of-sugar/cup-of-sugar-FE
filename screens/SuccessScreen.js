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

export default function SuccessScreen(props) {
  const action = props.route.params.action;
  const userId = props.route.params.userId;
  const name = props.route.params.name;
  const quantity = props.route.params.quantity;
  const measurement = props.route.params.measurement;
  const timeDuration = props.route.params.timeDuration;

  return (
    <View style={styles.container}>
      <Text style={styles.successMessage}>
        You have successfully{" "}
        {action === "borrow"
          ? "borrowed"
          : action === "return"
          ? "returned"
          : action === "request"
          ? "requested"
          : action === "lend"
          ? "offered to loan your"
          : ""}
        :
      </Text>
      {action === "lend" || action === "request" ? (
        <Text style={styles.itemInfo}>{name}</Text>
      ) : !timeDuration ? (
        <Text style={styles.itemInfo}>
          {quantity} {measurement + " of"} {name}
        </Text>
      ) : (
        <Text style={styles.itemInfo}>
          1 {name}{" "}
          {action === "borrow" ? `for ${quantity} ${timeDuration}` : ""}
        </Text>
      )}
      {action === "borrow" ? (
        <>
          <Text style={styles.successMessage}>
            Message the lender to coordinate pick-up details!
          </Text>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() =>
              props.navigation.navigate("Compose", { action, userId })
            }
          >
            <Text style={styles.messageButtonText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() =>
              props.navigation.navigate("Home", { action, userId })
            }
          >
            <Text style={styles.messageButtonText}>Message Later</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.successMessage}>
            The neighbor who requested to borrow this item will reach out to you
            soon. Thank you!
          </Text>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() =>
              props.navigation.navigate("Home", { action, userId })
            }
          >
            <Text style={styles.messageButtonText}>
              {action === "lend" ? "Loan" : "Borrow"} Another Item
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80
  },
  successMessage: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    lineHeight: 35,
    margin: 20,
    textAlign: "center"
  },
  itemInfo: {
    alignSelf: "center",
    backgroundColor: Colors.darkBlue,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.aqua,
    height: 70,
    lineHeight: 35,
    paddingTop: 15,
    marginBottom: 60,
    overflow: "hidden",
    width: 360,
    textAlign: "center"
  },
  messageButton: {
    margin: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  messageButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
