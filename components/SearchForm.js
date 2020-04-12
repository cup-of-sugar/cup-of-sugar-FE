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
import { useQuery } from "@apollo/react-hooks";

export default function SearchForm(props) {
  const navigation = useNavigation();

  const CATEGORIES = gql`
    {
      getAllCategories {
        name
      }
    }
  `;

  let { loading, error, data } = useQuery(CATEGORIES);

  return (
    <HomeForm
      {...props}
      action={props.action}
      navigation={navigation}
      categories={data}
    />
  );
}

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "", itemName: "", error: "" };
  }

  checkInputs = () => {
    const action = this.props.action;
    action === "lend"
      ? !this.state.category || !this.state.itemName
        ? this.setState({ error: "Please complete both form fields!" })
        : this.loanNewItem()
      : !this.state.category
      ? this.setState({ error: "Please choose a category!" })
      : this.startSearch();
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  startSearch = () => {
    const category = this.state.category;
    const itemName = this.state.itemName.toLowerCase() || null;
    this.props.navigation.navigate("Search Results", {
      category: category,
      itemName: itemName,
      action: "borrow"
    });
    this.setState({ category: "", itemName: "", error: "" });
  };

  loanNewItem = () => {
    const category = this.state.category;
    const itemName = this.state.itemName.toLowerCase();
    this.props.navigation.navigate("Loan Details", {
      category: category,
      name: itemName,
      action: "lend"
    });
    this.setState({ category: "", itemName: "", error: "" });
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
      <View style={styles.formContainer}>
        <Text style={styles.header}>Item Category</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItems}
          name="category"
          selectedValue={this.state.category}
          onValueChange={pick => this.handleChange("category", pick)}
        >
          <Picker.Item label="Choose a category..." />
          {pickers}
        </Picker>
        <Text style={styles.header}>
          Item Name{this.props.action === "borrow" ? "(Optional)" : ""}
        </Text>
        <TextInput
          style={styles.textInput}
          name="itemName"
          value={this.state.itemName}
          onChangeText={text => this.handleChange("itemName", text)}
          placeholder="Item name..."
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={this.checkInputs}
        >
          <Text style={styles.searchButtonText}>
            {this.props.action === "borrow" ? "Search" : "Continue"}
          </Text>
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
    paddingTop: 15
  },
  header: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: 50,
    fontSize: 25,
    margin: 10,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  picker: {
    margin: 10
  },
  pickerItems: {
    fontSize: 26,
    height: 150
  },
  searchButton: {
    margin: 40,
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
  }
});
