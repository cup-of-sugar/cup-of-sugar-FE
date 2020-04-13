import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function MenuItems({ closeMenu, action, userId }) {
  const navigation = useNavigation();
  const handlePress = path => {
    navigation.navigate(path, { action, userId });
    closeMenu();
  };

  const handleLogout = () => {
    try {
      AsyncStorage.removeItem("action").then(() =>
        navigation.navigate("Login")
      );
    } catch (exception) {
      console.log("Error clearing storage");
    }
  };

  return (
    <View style={styles.drawerItems}>
      <TouchableOpacity onPress={() => handlePress("Path")}>
        <Text style={styles.drawerText}>
          Go to {action === "borrow" ? "Lending" : "Borrowing"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("My Items", { action, userId })}
      >
        <Text style={styles.drawerText}>
          View My {action === "borrow" ? "Borrowed" : "Loaned"} Items
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Messages")}>
        <Text style={styles.drawerText}>My Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handlePress(action === "borrow" ? "Request" : "Home", {
            action: "lend"
          })
        }
      >
        <Text style={styles.drawerText}>
          {action === "borrow" ? "Make a Request" : "Loan an Item"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerItems: {
    backgroundColor: Colors.lightBlue,
    height: 350,
    width: 300
  },
  drawerText: {
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    height: 70,
    padding: 20,
    width: "100%"
  }
});
