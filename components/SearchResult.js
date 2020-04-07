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

export function SearchResult({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.searchResult}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <Text style={styles.itemName}>
        <Image style={styles.icon} source={item.available ? available : out} />
        {item.name}
      </Text>
      <View style={styles.itemInfo}>
        <Text style={styles.amount}>
          {item.quantity} {item.measurement ? item.measurement : ""} available
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchResult: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.aqua,
    borderRadius: 7,
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 10,
    height: 70,
    width: 330
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10
  },
  amount: {
    fontSize: 13,
    fontWeight: "bold",
    padding: 3,
    textAlign: "right"
  },
  icon: {
    height: 20,
    width: 20
  }
});
