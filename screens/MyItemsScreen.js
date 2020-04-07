import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function MyItemsScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.itemsMessage}>You are currently borrowing:</Text>
      <ScrollView style={styles.itemsContainer}>
        <View style={styles.item}>
          <Text style={styles.itemName}>Butter</Text>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() =>
              navigation.navigate("Success!", { action: "returned" })
            }
          >
            <Text style={styles.returnButtonText}>Return</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemName}>Milk</Text>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() =>
              navigation.navigate("Success!", { action: "returned" })
            }
          >
            <Text style={styles.returnButtonText}>Return</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80
  },
  itemsContainer: {
    flex: 1
  },
  itemsMessage: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    lineHeight: 35,
    margin: 20,
    textAlign: "center"
  },
  item: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.aqua,
    borderRadius: 7,
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 20,
    height: 70,
    width: 330
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.darkBlue,
    textAlign: "left"
  },
  returnButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    color: "#fff",
    height: 50,
    paddingTop: 10,
    width: 150
  },
  returnButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
