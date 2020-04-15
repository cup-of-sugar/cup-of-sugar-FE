import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { SearchResult } from "./SearchResult";
import Colors from "../constants/Colors";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import borrower from "../assets/images/borrower.png";
import lender from "../assets/images/lender.png";

export const SENT_MESSAGES = gql`
  query UserOutbox($userId: ID!) {
    userOutbox(userId: $userId) {
      title
      body
      recipient {
        firstName
        email
      }
    }
  }
`;

export default function Outbox(props) {
  const navigation = props.navigation;
  const userId = props.userId;

  let { loading, error, data } = useQuery(SENT_MESSAGES, {
    variables: {
      userId
    },
    fetchPolicy: "network-only"
  });

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

  if (error) return <Text style={styles.errorText}>No messages found!</Text>;

  if (data) {
    return data.userOutbox.length ? (
      data.userOutbox.map(mail => {
        return (
          <TouchableOpacity
            key={mail.title}
            style={styles.message}
            onPress={() =>
              navigation.navigate("Message", {
                message: mail,
                userId: props.userId
              })
            }
          >
            <Text style={styles.messageText}>
              To: {mail.recipient.firstName}
            </Text>
            <Image source={borrower} style={styles.icon} />
          </TouchableOpacity>
        );
      })
    ) : (
      <Text style={styles.errorText}>No messages found!</Text>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    flex: 0,
    flexDirection: "row",
    height: 70,
    marginHorizontal: 40,
    marginVertical: 10,
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
  },
  loadingText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  errorText: {
    alignSelf: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    marginTop: 50
  }
});
