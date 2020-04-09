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

export default function HomeSearchForm(props) {
  const navigation = useNavigation();

  return <HomeForm {...props} navigation={navigation} />;
}

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "", itemName: "", error: "" };
  }

  checkInputs = () => {
    !this.state.category || !this.state.itemName
      ? this.setState({ error: "Please complete both form fields!" })
      : this.startSearch();
  };

  handleNameChange = itemName => {
    this.setState({ itemName });
  };

  handleCategoryChange = category => {
    this.setState({ category });
  };

  startSearch = () => {
    const category = this.state.category;
    const itemName = this.state.itemName.toLowerCase();
    this.props.navigation.navigate("Search Results", { category, itemName });
    this.setState({ category: "", itemName: "", error: "" });
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Category:</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItems}
          name="category"
          selectedValue={this.state.category}
          onValueChange={this.handleCategoryChange}
        >
          <Picker.Item label="Choose a category..." />
          <Picker.Item label="Cleaning" value="Cleaning" />
          <Picker.Item label="Clothing" value="Clothing" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Gardening" value="Gardening" />
          <Picker.Item label="Home Improvement" value="Home Improvement" />
        </Picker>
        <Text style={styles.header}>Item Name:</Text>
        <TextInput
          style={styles.textInput}
          name="itemName"
          value={this.state.itemName}
          onChangeText={this.handleNameChange}
          placeholder="Item name..."
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={this.checkInputs}
        >
          <Text style={styles.searchButtonText}>Search</Text>
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
