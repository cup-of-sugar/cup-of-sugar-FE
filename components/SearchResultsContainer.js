import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { SearchResult } from "./SearchResult";
import Colors from "../constants/Colors";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export let ITEMS;

function findItemData(data, action) {
  return data.getAllItemsByName ? (
    data.getAllItemsByName.length ? (
      data.getAllItemsByName.map(item => {
        return <SearchResult key={item.id} item={item} action={action} />;
      })
    ) : (
      <Text style={styles.errorText}>No items found!</Text>
    )
  ) : data.getAllItemsInCategory ? (
    data.getAllItemsInCategory.length ? (
      data.getAllItemsInCategory.map(item => {
        return <SearchResult key={item.id} item={item} action={action} />;
      })
    ) : (
      <Text style={styles.errorText}>No items found!</Text>
    )
  ) : (
    <Text style={styles.errorText}>No items found!</Text>
  );
}

export function SearchResultsContainer(props) {
  let category = props.items.category;
  let item = props.items.itemName;
  let action = props.action;

  item
    ? (ITEMS = gql`
      {
        getAllItemsByName(itemName: "${item}") {
          name
          quantity
          description
          measurement
          available
          timeDuration
          id
          category {
            name
          }
        }
      }
    `)
    : (ITEMS = gql`
        {
          getAllItemsInCategory(name: "${category}") {
            name
            quantity
            description
            measurement
            available
            timeDuration
            id
            category {
              name
            }
          }
        }
      `);

  let { loading, error, data } = useQuery(ITEMS, {
    fetchPolicy: "network-only"
  });

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>No items found!</Text>;

  if (data) {
    return (
      <View style={styles.searchContainer}>
        <ScrollView
          style={styles.searchContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.resultsText}>Results:</Text>
          {findItemData(data, action)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    justifyContent: "center",
    padding: 20,
    width: "98%"
  },
  searchContainer: {
    marginLeft: "1%",
    flex: 1
  },
  resultsText: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  errorText: {
    alignSelf: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  loadingText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  }
});
