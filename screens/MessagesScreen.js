import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

export default function MessagesScreen(props) {
  // const userID = props.route.params.userID;

  return (
    <View style={styles.container}>
      <Text style={styles.successMessage}>Messages:</Text>
      <View>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => props.navigation.navigate("Message Details")}
        >
          <Text style={styles.messageButtonText}>From: Tiger King</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.aqua,
    height: 70,
    lineHeight: 35,
    paddingTop: 15,
    marginBottom: 60,
    width: 300,
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
