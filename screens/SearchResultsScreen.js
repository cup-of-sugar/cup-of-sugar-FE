import * as WebBrowser from "expo-web-browser";
import * as React from "react";
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
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function SearchResultsScreen(props) {
  const navigation = useNavigation();
  const category = props.route.params.category;
  const itemName = props.route.params.itemName;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.searchButtonText}>Try Another Search</Text>
      </TouchableOpacity>
      <SearchResultsContainer items={{ category, itemName }} />
    </ScrollView>
  );
}

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