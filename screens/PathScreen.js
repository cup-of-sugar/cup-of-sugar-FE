import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import cupOfSugar from "../assets/images/cupofsugar.png";

export default function PathScreen(props) {
  const token = props.route.params.token;

  const handleChoice = action => {
    const items = [["action", action], ["token", token]];
    try {
      AsyncStorage.multiSet(items).then(() =>
        props.navigation.navigate("Home", { action })
      );
    } catch (error) {
      console.log("error saving choice");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      scrollIndicatorInsets={{ right: 1 }}
      contentContainerStyle={styles.contentContainer}
    >
      <Image style={styles.logo} source={cupOfSugar} />
      <TouchableOpacity
        style={styles.choiceButton}
        onPress={() => handleChoice("borrow")}
      >
        <Text style={styles.choiceText}>BORROW</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.choiceButton}
        onPress={() => handleChoice("lend")}
      >
        <Text style={styles.choiceText}>LEND</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

PathScreen.navigationOptions = {
  header: "none"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue
  },
  contentContainer: {
    justifyContent: "center",
    paddingTop: 30
  },
  choiceText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 35,
    margin: 10,
    marginTop: 20,
    textAlign: "center"
  },
  choiceButton: {
    margin: 40,
    marginBottom: 15,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue
  },
  logo: {
    alignSelf: "center",
    height: 210,
    marginTop: 100,
    marginBottom: 50,
    width: 300
  }
});
