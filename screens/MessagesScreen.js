import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import Inbox from "../components/Inbox";
import Outbox from "../components/Outbox";
import { ScrollView } from "react-native-gesture-handler";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export default function MessagesScreen(props) {
  const userId = props.route.params.userId;
  const [messageView, setMessageView] = React.useState("inbox");

  return (
    <View style={styles.container}>
      <ScrollView
        scrollIndicatorInsets={{ right: 1 }}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.inboxLabel}
            onPress={() => setMessageView("inbox")}
          >
            <Text style={styles.inboxMailboxText}>Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sentLabel}
            onPress={() => setMessageView("sent")}
          >
            <Text style={styles.sentMailboxText}>Sent</Text>
          </TouchableOpacity>
        </View>
        {messageView === "inbox" ? (
          <View style={styles.inbox}>
            <Inbox userID={userId} navigation={props.navigation} />
          </View>
        ) : (
          <View style={styles.sent}>
            <Outbox userID={userId} navigation={props.navigation} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
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
  }
});
