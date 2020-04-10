import React, { Component } from "react";
import {
  Picker,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm(props) {
  const navigation = useNavigation();
  return <LoginFormClass {...props} navigation={navigation} />;
}

class LoginFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: "" };
  }

  checkInputs = () => {
    !this.state.username || !this.state.password
      ? this.setState({ error: "Please submit a username and password!" })
      : this.startLogin();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  startLogin = () => {
    const username = this.state.username;
    const password = this.state.password;
    console.log(username, password);
    this.props.navigation.navigate("Path", { username, password });
    this.setState({ username: "", password: "", error: "" });
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Username</Text>
        <TextInput
          style={styles.textInput}
          name="username"
          value={this.state.username}
          onChangeText={text => this.handleChange("username", text)}
          placeholder="Username..."
        />
        <Text style={styles.header}>Password</Text>
        <TextInput
          style={styles.textInput}
          name="password"
          value={this.state.password}
          onChangeText={text => this.handleChange("password", text)}
          placeholder="Password..."
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.checkInputs}
        >
          <Text style={styles.submitButtonText}>Search</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    alignSelf: "center",
    backgroundColor: Colors.darkBlue,
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center"
  },
  formContainer: {
    flex: 1
  },
  header: {
    backgroundColor: Colors.darkBlue,
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 40,
    marginVertical: 5,
    paddingLeft: 5,
    textAlign: "left",
    width: 130
  },
  textInput: {
    backgroundColor: "#fff",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    fontSize: 25,
    marginHorizontal: 40,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  submitButton: {
    margin: 40,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue
  },
  submitButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
