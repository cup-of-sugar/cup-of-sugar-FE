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

export default function MenuItems({ closeMenu, action }) {
  const navigation = useNavigation();

  const handlePress = path => {
    navigation.navigate(path, { action });
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
      <TouchableOpacity onPress={() => handlePress("Home", { action })}>
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Path")}>
        <Text style={styles.drawerText}>
          Go to {action === "borrow" ? "Lending" : "Borrowing"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("My Items", { action })}>
        <Text style={styles.drawerText}>
          {action === "borrow" ? "My Borrowed Items" : "Items I'm Lending"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress("Offers/Requests", { action })}
      >
        <Text style={styles.drawerText}>
          {action === "borrow" ? "My Item Requests" : "Items I'm Offering"}
        </Text>
      </TouchableOpacity>
      {action === "lend" ? (
        <TouchableOpacity
          onPress={() => handlePress("LenderRequests", { action })}
        >
          <Text style={styles.drawerText}>Neighorhood Requests</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={() => handlePress("Messages", { action })}>
        <Text style={styles.drawerText}>My Messages</Text>
      </TouchableOpacity>
      {action === "borrow" ? (
        <TouchableOpacity onPress={() => handlePress("Request", { action })}>
          <Text style={styles.drawerText}>Make a Request</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerItems: {
    backgroundColor: Colors.lightBlue,
    height: 490,
    width: 260
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
