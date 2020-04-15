import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Colors from "../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import plane from "../assets/images/plane.png";
import { SENT_MESSAGES } from "../components/Outbox";
import { INBOX_MESSAGES } from "../components/Inbox";

export default function ComposeMessageScreen(props) {
  let title, body, recipientId;
  const userId = props.route.params.userId;

  const NEW_MESSAGE = gql`
    mutation SendMessage(
      $title: String!
      $body: String!
      $userId: ID!
      $recipientId: ID!
    ) {
      message: sendMessage(
        input: {
          title: $title
          body: $body
          userId: $userId
          recipientId: $recipientId
        }
      ) {
        id
        title
        body
      }
    }
  `;

  const [sendMessage] = useMutation(NEW_MESSAGE, {
    variables: {
      title,
      body,
      userId,
      recipientId
    },
    refetchQueries: () => [
      {
        query: SENT_MESSAGES
      },
      {
        query: INBOX_MESSAGES,
        variables: {
          userId: userId
        }
      }
    ]
  });

  return (
    <ComposeForm
      userId={userId}
      recipient={props.route.params.recipient}
      navigation={props.navigation}
      sendMessage={sendMessage}
    />
  );
}

class ComposeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subject: "", body: "", error: "", sent: false };
  }

  checkInputs = () => {
    !this.state.subject || !this.state.body
      ? this.setState({ error: "Please add a subject and a message!" })
      : this.sendMessage();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  sendMessage = () => {
    this.props
      .sendMessage({
        variables: {
          userId: this.props.userId,
          recipientId: this.props.recipient.email || "carole@tigers.com",
          title: this.state.subject,
          body: this.state.body
        }
      })
      .then(() => this.setState({ sent: true }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <View style={styles.formContainer}>
        {!this.state.sent ? (
          <>
            <View style={styles.toContainer}>
              <Text style={styles.header}>
                To: {this.props.recipient.firstName || "Joe Exotic"}
              </Text>
            </View>
            <View style={styles.subjectContainer}>
              <TextInput
                style={styles.subjectInput}
                name="subject"
                value={this.state.subject}
                onChangeText={text => this.handleChange("subject", text)}
                placeholder="Subject..."
              />
            </View>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                name="body"
                value={this.state.body}
                multiline={true}
                numberOfLines={40}
                onChangeText={text => this.handleChange("body", text)}
                placeholder="Message..."
              />
            </View>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={this.checkInputs}
            >
              <Text style={styles.sendButtonText}>Send Message</Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </>
        ) : (
          <>
            <Text style={styles.sent}>Sent!</Text>
            <Image source={plane} style={styles.plane} />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() =>
                this.props.navigation.navigate("Home", {
                  action: this.props.action,
                  userId: this.state.userId
                })
              }
            >
              <Text style={styles.sendButtonText}>Home</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
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
  formContainer: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    paddingTop: 30
  },
  toContainer: {
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 5
  },
  subjectContainer: {
    backgroundColor: Colors.darkBlue,
    padding: 5
  },
  subjectInput: {
    backgroundColor: "#fff",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    fontSize: 22,
    paddingHorizontal: 15
  },
  header: {
    color: "#fff",
    fontSize: 23,
    textAlign: "left",
    fontWeight: "bold",
    padding: 7,
    marginLeft: 10
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    fontSize: 22,
    margin: 10,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  sendButton: {
    marginHorizontal: 40,
    marginVertical: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  sendButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  textAreaContainer: {
    borderColor: Colors.darkBlue,
    borderWidth: 5,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopWidth: 0
  },
  textArea: {
    fontSize: 22,
    height: 400,
    justifyContent: "flex-start",
    padding: 15,
    paddingTop: 20
  },
  sent: {
    alignSelf: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: Colors.darkBlue,
    marginTop: 80
  },
  plane: {
    alignSelf: "center",
    height: 250,
    marginLeft: 20,
    marginRight: 30,
    marginVertical: 50,
    width: 240
  }
});
