import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Colors from "../constants/Colors";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import plane from "../assets/images/plane.png";

export default function ComposeMessageScreen(props) {
  return <ComposeForm action={props.action} navigation={props.navigation} />;
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
    this.setState({ sent: true });
  };

  // startSearch = () => {
  //   const category = this.state.category;
  //   const itemName = this.state.itemName.toLowerCase() || null;
  //   this.props.navigation.navigate("Search Results", {
  //     category: category,
  //     itemName: itemName,
  //     action: "borrow",
  //     userId: this.props.userId
  //   });
  //   this.setState({ category: "", itemName: "", error: "" });
  // };
  //
  // loanNewItem = () => {
  //   const category = this.state.category;
  //   const itemName = this.state.itemName.toLowerCase();
  //   this.props.navigation.navigate("Loan Details", {
  //     category: category,
  //     name: itemName,
  //     action: "lend",
  //     userId: this.props.userId
  //   });
  //   this.setState({ category: "", itemName: "", error: "" });
  // };

  render() {
    return (
      <View style={styles.formContainer}>
        {!this.state.sent ? (
          <>
            <View style={styles.toContainer}>
              <Text style={styles.header}>To: Joe@tigers.com</Text>
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
