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
    this.state = { menuOpen: false, action: "", userId: "" };
  }

  findPath = () => {
    AsyncStorage.multiGet(["action", "userId"]).then(storedData =>
      this.setState({ action: storedData[0][1], userId: storedData[1][1] })
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
      <View style={styles.drawerContainer}>
        <TouchableOpacity
          onPress={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <Image
            source={this.state.menuOpen ? menuClosed : menu}
            style={styles.menu}
          />
        </TouchableOpacity>
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
                userId={this.state.userId}
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
    ) : null;
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    width: "190%"
  },
  drawer: {
    backgroundColor: "#fff"
  },
  menu: {
    height: 30,
    margin: 20,
    marginTop: 23,
    width: 40
  }
});
