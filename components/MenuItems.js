import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function MenuItems() {
  const navigation = useNavigation();

  return (
    <View style={styles.drawerItems}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.drawerText}>Go to Lending</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("My Items")}>
        <Text style={styles.drawerText}>View My Borrowed Items</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RequestScreen")}>
        <Text style={styles.drawerText}>Make A Request</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
