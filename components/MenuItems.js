import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function MenuItems({ closeMenu }) {
  const navigation = useNavigation();

  const handlePress = path => {
    navigation.navigate(path);
    closeMenu();
  };

  return (
    <View style={styles.drawerItems}>
      <TouchableOpacity onPress={() => handlePress("Path")}>
        <Text style={styles.drawerText}>Go to Lending</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("My Items")}>
        <Text style={styles.drawerText}>View My Borrowed Items</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("RequestScreen")}>
        <Text style={styles.drawerText}>Make A Request</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Home")}>
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerItems: {
    backgroundColor: Colors.lightBlue,
    height: 280,
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
