import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import HomeForm from "../components/HomeForm";
import ErrorBoundary from "../components/ErrorBoundary";
import { SearchResultsContainer } from "../components/SearchResultsContainer";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MonoText } from "../components/StyledText";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: true,
      searchQuery: { category: "", itemName: "" }
    };
  }

  updateSearch = (itemName, category) => {
    this.setState({
      formVisible: false,
      searchQuery: { category: category, itemName: itemName.toLowerCase() }
    });
  };

  resetSearch = () => {
    this.setState({
      formVisible: true,
      searchQuery: { category: "", itemName: "" }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <ErrorBoundary>
            {this.state.formVisible ? (
              <>
                <Text style={styles.welcomeText}>
                  What would you like to borrow today?
                </Text>
                <HomeForm updateSearch={this.updateSearch} />
              </>
            ) : null}
          </ErrorBoundary>
          <ErrorBoundary>
            {this.state.searchQuery.category ? (
              <>
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={this.resetSearch}
                >
                  <Text style={styles.searchButtonText}>
                    Try Another Search
                  </Text>
                </TouchableOpacity>
                <SearchResultsContainer items={this.state.searchQuery} />
              </>
            ) : null}
          </ErrorBoundary>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: "none"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll"
  },
  contentContainer: {
    justifyContent: "center",
    paddingTop: 30
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    lineHeight: 35,
    margin: 10,
    marginTop: 20,
    textAlign: "center"
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
