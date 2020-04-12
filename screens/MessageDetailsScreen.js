import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Colors from "../constants/Colors";

export default function MessageDetailsScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.Container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.buttonContainer}>
          <Text>When can I get those tigers?</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 50,
    height: "100%"
  },
  contentContainer: {
    padding: 15
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inboxLabel: {
    backgroundColor: Colors.lightBlue,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    height: 70,
    padding: 20,
    width: 180
  },
  sentLabel: {
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    height: 70,
    padding: 20,
    width: 180
  },
  inbox: {
    backgroundColor: Colors.lightBlue,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    height: 500,
    paddingVertical: 20
  },
  sent: {
    backgroundColor: Colors.darkBlue,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    height: 500,
    paddingVertical: 20
  },
  inboxMailboxText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff"
  },
  sentMailboxText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "right"
  },
  message: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    flex: 0,
    flexDirection: "row",
    height: 70,
    margin: 40,
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: 350
  },
  messageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.darkBlue,
    paddingRight: 10
  },
  icon: {
    height: 25,
    width: 115
  }
});
