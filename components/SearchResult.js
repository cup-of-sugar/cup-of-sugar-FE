import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import available from "../assets/images/available.png";
import out from "../assets/images/out.png";

export function SearchResult({ item, action, image }) {
  const navigation = useNavigation;

  return (
    <TouchableOpacity
      style={styles.searchResult}
      onPress={() => navigation.navigate("Details", { item, action })}
    >
      <Image style={styles.photo} source={image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Image style={styles.icon} source={item.available ? available : out} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchResult: {
    backgroundColor: Colors.aqua,
    borderRadius: 7,
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 10,
    height: 70,
    textAlign: "left",
    width: 330
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5
  },
  amount: {
    fontSize: 13,
    fontWeight: "bold",
    padding: 3,
    textAlign: "right"
  },
  icon: {
    height: 20,
    marginTop: 12,
    width: 20
  },
  photo: {
    height: 50,
    width: 50
  }
});
