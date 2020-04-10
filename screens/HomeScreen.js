import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import SearchForm from "../components/SearchForm";
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

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.welcomeText}>
        What would you like to borrow today?
      </Text>
      <SearchForm />
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: "none"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
