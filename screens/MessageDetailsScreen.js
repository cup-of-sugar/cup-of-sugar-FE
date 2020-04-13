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
        <View style={styles.subjectContainer}>
          <Text style={styles.subject}>Subject: Tigers</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageContent}>
            When can I get those tigers? Thanks, Carole
          </Text>
        </View>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
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
  messageContainer: {
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: Colors.lightBlue,
    borderWidth: 3,
    flex: 1
  },
  subjectContainer: {
    backgroundColor: Colors.lightBlue,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  },
  subject: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    height: 70,
    padding: 20
  },
  messageContent: {
    fontSize: 20,
    height: 400,
    padding: 15
  },
  replyButton: {
    margin: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  replyButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
