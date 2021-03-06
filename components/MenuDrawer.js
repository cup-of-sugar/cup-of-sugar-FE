import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import Drawer from "react-native-drawer";
import MenuItems from "./MenuItems";
import { withNavigation } from "react-navigation";
import menu from "../assets/images/menuicon.png";
import menuClosed from "../assets/images/X.png";

export default class MenuDrawer extends Component {
  constructor() {
    super();
    this.state = { menuOpen: false, action: "" };
  }

  findPath = () => {
    AsyncStorage.getItem("action").then(data =>
      this.setState({ action: data })
    );
  };

  componentDidMount() {
    this.findPath();
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    return this.state.action ? (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <Image
            source={this.state.menuOpen ? menuClosed : menu}
            style={styles.menu}
          />
        </TouchableOpacity>
        <View style={styles.drawerContainer}>
          <Drawer
            open={this.state.menuOpen}
            type="static"
            openDrawerOffset={0.5}
            closedDrawerOffset={0}
            content={
              this.state.menuOpen ? (
                <MenuItems
                  closeMenu={this.closeMenu}
                  action={this.state.action}
                />
              ) : null
            }
            tapToClose={true}
            onClose={this.closeDrawer}
            styles={styles.drawer}
            tweenEasing={"easeInOutQuad"}
            tweenDuration={400}
          ></Drawer>
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginRight: 20
  },
  drawerContainer: {
    marginTop: 20,
    marginRight: 230
  },
  drawer: {
    backgroundColor: "#fff"
  },
  menu: {
    height: 30,
    marginLeft: 200,
    width: 40
  }
});
