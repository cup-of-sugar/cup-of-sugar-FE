import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { ITEMS } from "../components/SearchResultsContainer";
import { OFFERS } from "./OffersAndRequestsScreen";
import { BORROWED_ITEMS } from "./MyItemsScreen";
import { LOANED_ITEMS } from "./MyItemsScreen";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";

export default function ItemDetailsScreen(props) {
  const item = props.route.params.item;
  const image = props.route.params.image;
  const action = props.route.params.action;
  const userId = props.route.params.userId;

  const [status, setStatus] = React.useState(true);

  const UPDATE_ITEM = gql`
    mutation {
      item: updateItemAvailability(
        input: { userId: ${userId} id: ${item.id}, available: ${item.available}, name: "${item.name}" }
      ) {
        id
        available
        name
      }
    }
  `;

  const handleAction = () => {
    action === "borrow"
      ? updateBorrow()
          .then(() => setStatus(!item.available))
          .then(() =>
            props.navigation.navigate("Success!", {
              action: action,
              userId: userId,
              name: item.name,
              quantity: item.quantity,
              measurement: item.measurement,
              timeDuration: item.timeDuration
            })
          )
          .catch(error => console.log(error))
      : updateLend()
          .then(() => setStatus(!item.available))
          .then(() =>
            props.navigation.navigate("Success!", {
              action: action,
              userId: userId,
              name: item.name,
              quantity: item.quantity,
              measurement: item.measurement,
              timeDuration: item.timeDuration
            })
          )
          .catch(error => console.log(error));
  };

  const [updateBorrow] = useMutation(UPDATE_ITEM, {
    refetchQueries: () => [
      {
        query: ITEMS,
        variables: {
          name: item.category.name,
          items: item.name
        }
      },
      {
        query: OFFERS
      },
      {
        query: LOANED_ITEMS
      },
      {
        query: BORROWED_ITEMS,
        variables: {
          userId: "1"
        }
      }
    ]
  });

  const [updateLend] = useMutation(UPDATE_ITEM, {
    refetchQueries: () => [
      {
        query: ITEMS,
        variables: {
          name: item.category.name,
          items: item.name
        }
      },
      {
        query: OFFERS
      },
      {
        query: LOANED_ITEMS
      },
      {
        query: BORROWED_ITEMS,
        variables: {
          userId: "1"
        }
      }
    ]
  });

  return (
    <ScrollView
      scrollIndicatorInsets={{ right: 1 }}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.name}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
      {action === "borrow" ? (
        <Image style={styles.image} source={image} />
      ) : null}
      <View style={styles.infoContainer}>
        <Text style={styles.itemInfoTitle}>Status:</Text>
        {action === "borrow" ? (
          status && item.available ? (
            !item.timeDuration ? (
              <Text style={styles.itemInfo}>
                {item.quantity} {item.measurement ? item.measurement : ""}{" "}
                available
              </Text>
            ) : (
              <Text style={styles.itemInfo}>
                Available to borrow for
                {item.timeDuration}
              </Text>
            )
          ) : (
            <Text style={styles.itemInfo}>Not available currently.</Text>
          )
        ) : !item.timeDuration ? (
          <Text style={styles.itemInfo}>
            {item.quantity} {item.measurement ? item.measurement : ""}
            {""}
          </Text>
        ) : (
          <Text style={styles.itemInfo}>
            Needed for
            {item.timeDuration}
          </Text>
        )}
        <Text style={styles.itemInfoTitle}>Category:</Text>
        <Text style={styles.itemInfo}>{item.category.name}</Text>
        <Text style={styles.itemInfoTitle}>Description:</Text>
        <Text style={styles.itemInfo}>
          {item.description || "No description yet!"}
        </Text>
      </View>
      {action === "borrow" ? (
        status && item.available ? (
          <TouchableOpacity
            style={styles.borrowButton}
            onPress={() => handleAction()}
          >
            <Text style={styles.borrowButtonText}>Borrow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.borrowButton}
            onPress={() =>
              props.navigation.navigate("Home", { action, userId })
            }
          >
            <Text style={styles.borrowButtonText}>Try Another Search</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity
          style={styles.borrowButton}
          onPress={() => handleAction()}
        >
          <Text style={styles.borrowButtonText}>Lend Item</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    backgroundColor: "#fafafa",
    flex: 1,
    textAlign: "center"
  },
  contentContainer: {
    alignSelf: "center",
    justifyContent: "center",
    padding: 15,
    paddingTop: 30,
    width: "85%"
  },
  borrowButton: {
    marginHorizontal: 30,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  borrowButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  name: {
    alignSelf: "center",
    backgroundColor: Colors.aqua,
    fontSize: 35,
    fontWeight: "bold",
    height: 60,
    marginBottom: 25,
    paddingTop: 8,
    textAlign: "center",
    width: "100%"
  },
  infoContainer: {
    alignSelf: "center"
  },
  itemInfo: {
    fontSize: 25,
    marginBottom: 10
  },
  itemInfoTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10
  },
  image: {
    alignSelf: "center",
    backgroundColor: Colors.darkBlue,
    height: 200,
    marginBottom: 15,
    width: 200
  }
});
