import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { OFFERS } from "./OffersAndRequestsScreen";

export default function LoanDetailsScreen(props) {
  let name = props.route.params.name;
  let category = props.route.params.category;
  let userId = props.route.params.userId;
  let title, description, quantity, measurement, timeDuration;

  const NEW_ITEM = gql`
    mutation CreatePosting(
      $userId: ID!
      $title: String!
      $category: String!
      $name: String!
      $description: String!
      $quantity: String!
      $measurement: String!
      $timeDuration: String!
    ) {
      posting: createPosting(
        input: {
          userId: $userId
          title: $title
          postingType: "lend"
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
        timeDuration
      }
    }
  `;

  let [addNewItem] = useMutation(NEW_ITEM, {
    variables: {
      userId,
      title,
      category,
      name,
      description,
      quantity,
      measurement,
      timeDuration
    },
    refetchQueries: () => [
      {
        query: OFFERS,
        variables: {
          userId: userId
        }
      }
    ]
  });

  return (
    <LoanDetailsForm
      category={category}
      item={name}
      userId={userId}
      action={props.action}
      navigation={props.navigation}
      addNewItem={addNewItem}
    />
  );
}

export class LoanDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      quantity: 0,
      measurement: "",
      timeDuration: "",
      error: ""
    };
  }

  checkInputs = () => {
    !this.state.title || !this.state.description || !this.state.quantity
      ? this.setState({ error: "Please complete all fields!" })
      : this.addItem();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  addItem = () => {
    this.props
      .addNewItem({
        variables: {
          userId: this.props.userId,
          title: this.state.title,
          description: this.state.description,
          quantity: this.state.quantity,
          measurement: this.state.measurement || "null",
          timeDuration: this.state.timeDuration || "null"
        }
      })
      .then(response => this.confirmNewItem())
      .catch(error => console.log(error));
  };

  confirmNewItem = () => {
    this.props.navigation.navigate("Success!", {
      name: this.props.item,
      timeDuration: this.state.timeDuration,
      measurement: this.state.measurement,
      quantity: this.state.quantity,
      action: "lend",
      userId: this.props.userId
    });
    this.setState({
      title: "",
      description: "",
      quantity: 0,
      measurement: "",
      timeDuration: "",
      error: ""
    });
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Title</Text>
        <TextInput
          style={styles.textInput}
          name="title"
          value={this.state.title}
          onChangeText={text => this.handleChange("title", text)}
          placeholder="Title..."
        />
        <Text style={styles.header}>Description</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            name="description"
            value={this.state.description}
            multiline={true}
            numberOfLines={10}
            onChangeText={text => this.handleChange("description", text)}
            placeholder="Description..."
          />
        </View>
        <Text style={styles.header}>Quantity</Text>
        <TextInput
          style={styles.textInput}
          numericvalue
          keyboardType={"numeric"}
          value={String(this.state.quantity)}
          onChangeText={text => this.handleChange("quantity", text)}
        />
        {this.props.category === "Food" ? (
          <View>
            <Text style={styles.header}>Measurement</Text>
            <TextInput
              style={styles.textInput}
              name="measurement"
              value={this.state.measurement}
              onChangeText={text => this.handleChange("measurement", text)}
              placeholder="Example: cups, ounces..."
            />
          </View>
        ) : (
          <View>
            <Text style={styles.header}>Amount of Time</Text>
            <TextInput
              style={styles.textInput}
              name="timeDuration"
              value={this.state.timeDuration}
              onChangeText={text => this.handleChange("timeDuration", text)}
              placeholder="Example: 1 week..."
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={this.checkInputs}
        >
          <Text style={styles.searchButtonText}>Submit Item</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{this.state.error}</Text>
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
    flex: 1,
    margin: 15
  },
  header: {
    color: "black",
    fontSize: 25,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 5
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    fontSize: 25,
    margin: 10,
    paddingHorizontal: 15
  },
  searchButton: {
    marginHorizontal: 40,
    marginVertical: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  searchButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  textAreaContainer: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    margin: 10
  },
  textArea: {
    fontSize: 25,
    height: 100,
    justifyContent: "flex-start",
    paddingHorizontal: 15
  }
});
