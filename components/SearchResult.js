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
import cup from "../assets/images/cup.png";

export function SearchResult(props) {
  const navigation = useNavigation();

  return <SearchResultClass {...props} navigation={navigation} />;
}

class SearchResultClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: "" };
  }

  componentDidMount() {
    this.getImage();
  }

  getImage = () => {
    fetch(
      `https://pixabay.com/api/?key=16000731-2e1b57c476acc3626a2d847d9&q=${this.props.item.name}&image_type=photo&safesearch=true&per_page=3`
    )
      .then(response => response.json())
      .then(image =>
        this.setState({ imageUrl: { uri: image.hits[0].largeImageURL } })
      )
      .catch(error => console.log(error));
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.searchResult}
        onPress={() =>
          this.props.navigation.navigate("Details", {
            item: this.props.item,
            action: this.props.action,
            image: this.state.imageUrl || cup
          })
        }
      >
        <Image style={styles.photo} source={this.state.imageUrl || cup} />
        <Text style={styles.itemName}>{this.props.item.name}</Text>
        <Image
          style={styles.icon}
          source={this.props.item.available ? available : out}
        />
      </TouchableOpacity>
    );
  }
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
