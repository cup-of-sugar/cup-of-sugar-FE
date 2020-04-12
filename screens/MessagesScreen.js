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
import borrower from "../assets/images/borrower.png";
import lender from "../assets/images/lender.png";

export default function MessagesScreen(props) {
  // const userID = props.route.params.userID;
  const [messageView, setMessageView] = React.useState("inbox");

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.Container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.inboxLabel}
            onPress={() => setMessageView("inbox")}
          >
            <Text style={styles.inboxMailboxText}>Inbox (1)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sentLabel}
            onPress={() => setMessageView("sent")}
          >
            <Text style={styles.sentMailboxText}>Sent (1)</Text>
          </TouchableOpacity>
        </View>
        {messageView === "inbox" ? (
          <View style={styles.inbox}>
            <TouchableOpacity
              style={styles.message}
              onPress={() => props.navigation.navigate("Message Details")}
            >
              <Text style={styles.messageText}>From: Tiger King</Text>
              <Image source={borrower} style={styles.icon} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sent}>
            <TouchableOpacity
              style={styles.message}
              onPress={() => props.navigation.navigate("Message Details")}
            >
              <Text style={styles.messageText}>To: Carole Baskin</Text>
              <Image style={styles.icon} source={lender} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 50
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
