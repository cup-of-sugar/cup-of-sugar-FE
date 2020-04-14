import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Component } from "react";
import {
  TouchableOpacity,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";

export default function RequestScreen(props) {
  const navigation = props.navigation;
  const userId = props.route.params.userId;
  let title, category, name, description, quantity, measurement, timeDuration;

  const CATEGORIES = gql`
    {
      getAllCategories {
        name
      }
    }
  `;

  let { loading, error, data } = useQuery(CATEGORIES);

  const NEW_REQUEST = gql`
    mutation CreatePosting(
      $title: String!
      $userId: ID!
      $category: String!
      $name: String!
      $description: String!
      $quantity: String!
      $measurement: String!
      $timeDuration: String!
    ) {
      posting: createPosting(
        input: {
          title: $title
          userId: $userId
          postingType: "borrow"
          categoryName: $category
          name: $name
          description: $description
          quantity: $quantity
          measurement: $measurement
          timeDuration: $timeDuration
        }
      ) {
        name
        description
        quantity
        measurement
      }
    }
  `;

  let [addNewRequest] = useMutation(NEW_REQUEST, {
    variables: {
      userId,
      title,
      category,
      name,
      description,
      quantity,
      measurement,
      timeDuration
    }
  });

  return (
    <RequestForm
      navigation={navigation}
      categories={data}
      addNewRequest={addNewRequest}
      userId={userId}
    />
  );
}

class RequestForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      category: "",
      name: "",
      description: "",
      quantity: 0,
      timeDuration: "",
      measurement: "",
      error: ""
    };
  }

  checkInputs = () => {
    !this.state.title ||
    !this.state.category ||
    !this.state.name ||
    !this.state.description ||
    !this.state.quantity
      ? this.setState({ error: "Please complete all fields!" })
      : this.requestNewItem();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  requestNewItem = () => {
    this.props
      .addNewRequest({
        variables: {
          userId: this.props.userId,
          title: this.state.title,
          category: this.state.category,
          name: this.state.name,
          description: this.state.description,
          quantity: this.state.quantity,
          measurement: this.state.measurement || "null",
          timeDuration: this.state.timeDuration || "null"
        }
      })
      .then(response => this.confirmRequest())
      .catch(error => console.log(error));
  };

  confirmRequest = () => {
    this.props.navigation.navigate("Success!", {
      name: this.state.name,
      userId: this.props.userId,
      timeDuration: this.state.timeDuration,
      measurement: this.state.measurement,
      quantity: this.state.quantity,
      action: "request"
    });
    this.setState({
      title: "",
      category: "",
      name: "",
      description: "",
      quantity: 0,
      measurement: "",
      timeDuration: "",
      error: ""
    });
  };

  render() {
    let pickers = this.props.categories
      ? this.props.categories.getAllCategories.map(category => (
          <Picker.Item
            key={category.name}
            label={category.name}
            value={category.name}
          />
        ))
      : null;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          scrollIndicatorInsets={{ right: 1 }}
          contentContainerStyle={styles.contentContainer}
        >
          <Text
            style={{
              ...Platform.select({ ios: styles.heading, android: styles.label })
            }}
          >
            What would you like to borrow?
          </Text>
          <Text
            style={{
              ...Platform.select({ ios: styles.header, android: styles.label })
            }}
          >
            Title of Your Request
          </Text>
          <TextInput
            placeholder="Title..."
            style={{
              ...Platform.select({
                ios: styles.textInput,
                android: styles.input
              })
            }}
            name="title"
            onChangeText={text => this.handleChange("title", text)}
          ></TextInput>
          <Text
            style={{
              ...Platform.select({ ios: styles.header, android: styles.label })
            }}
          >
            Item Category
          </Text>
          <Picker
            name="category"
            selectedValue={this.state.category}
            onValueChange={pick => this.handleChange("category", pick)}
            itemStyle={{
              ...Platform.select({ ios: styles.pickerItems })
            }}
            style={{
              ...Platform.select({
                ios: styles.picker,
                android: { marginBottom: 20, height: 40 }
              })
            }}
          >
            <Picker.Item label="Choose a category..." />
            {pickers}
          </Picker>
          <Text
            style={{
              ...Platform.select({ ios: styles.header, android: styles.label })
            }}
          >
            Item name
          </Text>
          <TextInput
            placeholder="Item name..."
            style={{
              ...Platform.select({
                ios: styles.textInput,
                android: styles.input
              })
            }}
            name="name"
            onChangeText={text => this.handleChange("name", text)}
          ></TextInput>
          <Text
            style={{
              ...Platform.select({ ios: styles.header, android: styles.label })
            }}
          >
            Description
          </Text>
          <TextInput
            placeholder="Description..."
            style={{
              ...Platform.select({
                ios: styles.textInput,
                android: styles.input
              })
            }}
            onChangeText={text => this.handleChange("description", text)}
            name="description"
          ></TextInput>
          <Text
            style={{
              ...Platform.select({ ios: styles.header, android: styles.label })
            }}
          >
            Quantity
          </Text>
          <TextInput
            placeholder="Quantity..."
            style={{
              ...Platform.select({
                ios: styles.textInput,
                android: styles.input
              })
            }}
            onChangeText={text => this.handleChange("quantity", text)}
            name="quantity"
            numericvalue
            keyboardType={"numeric"}
            value={String(this.state.quantity)}
          ></TextInput>
          {this.state.category === "Food" ? (
            <View>
              <Text
                style={{
                  ...Platform.select({
                    ios: styles.header,
                    android: styles.label
                  })
                }}
              >
                Measurement
              </Text>
              <TextInput
                style={{
                  ...Platform.select({
                    ios: styles.textInput,
                    android: styles.input
                  })
                }}
                name="measurement"
                value={this.state.measurement}
                onChangeText={text => this.handleChange("measurement", text)}
                placeholder="Example: cups, ounces..."
              />
            </View>
          ) : (
            <View>
              <Text
                style={{
                  ...Platform.select({
                    ios: styles.header,
                    android: styles.label
                  })
                }}
              >
                Amount of Time
              </Text>
              <TextInput
                style={{
                  ...Platform.select({
                    ios: styles.textInput,
                    android: styles.input
                  })
                }}
                name="timeDuration"
                value={this.state.timeDuration}
                onChangeText={text => this.handleChange("timeDuration", text)}
                placeholder="Example: 1 week..."
              />
            </View>
          )}
          {Platform.select({
            ios: (
              <TouchableOpacity
                style={styles.requestButton}
                onPress={() => this.checkInputs()}
              >
                <Text style={styles.requestButtonText}>Request Item</Text>
              </TouchableOpacity>
            ),
            android: (
              <Button
                onPress={() => this.checkInputs()}
                title="Request Item"
                color="#385A94"
              />
            )
          })}
          <Text style={styles.errorText}>{this.state.error}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 5
  },
  contentContainer: {
    justifyContent: "center"
  },
  errorText: {
    alignSelf: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 45,
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 5
  },
  label: {
    color: "black"
  },
  header: {
    color: "black",
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5
  },
  requestButton: {
    marginHorizontal: 40,
    marginVertical: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  requestButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  picker: {
    margin: 10
  },
  pickerItems: {
    fontSize: 24,
    height: 130
  },
  heading: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
    marginHorizontal: 10
  }
});
