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
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

export default function LoginForm(props) {
  let email, password;
  const navigation = useNavigation();

  // mutation UserLogin($email: String!, $password: String!) {
  //   user: userLogin(input: { email: $email, password: $password }) {
  //     email
  //   }
  // }

  const USER_LOGIN = gql`
    mutation {
      user: userLogin(
        input: {
          credentials: { email: "carole@tigers.com", password: "password" }
        }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  const [userLogin] = useMutation(USER_LOGIN);

  return <LoginFormClass navigation={navigation} userLogin={userLogin} />;
}

export class LoginFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "", validation: "" };
  }

  checkInputs = () => {
    !this.state.email || !this.state.password
      ? this.setState({ error: "Please submit a email and password!" })
      : this.startLogin();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value, error: "" });
  };

  startLogin = () => {
    this.props
      .userLogin()
      .then(response => this.validateLogin(response.data.user.token))
      .catch(error => console.log(error));
  };

  validateLogin = response => {
    this.setState({ validation: response });
    if (this.state.validation) {
      this.props.navigation.navigate("Path", { userId: this.state.validation });
      this.setState({ email: "", password: "", error: "", validation: "" });
    } else if (!this.state.validation) {
      this.setState({
        error: "Incorrect email or password! Please try again!"
      });
    } else {
      this.setState({
        error: "Error logging in!"
      });
    }
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Email</Text>
        <TextInput
          style={styles.textInput}
          name="email"
          value={this.state.email}
          onChangeText={text => this.handleChange("email", text)}
          placeholder="Email..."
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
          <Text style={styles.submitButtonText}>Login</Text>
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
    height: "auto",
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
