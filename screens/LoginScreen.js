import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import sugarCube from "../assets/images/sugarcube.png";
import LoginForm from "../components/LoginForm";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={sugarCube} style={styles.background}>
        <Text style={styles.welcomeText}>Welcome to Cup of Sugar!</Text>
        <LoginForm />
      </ImageBackground>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: "none"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    flex: 1
  },
  welcomeText: {
    backgroundColor: Colors.darkBlue,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    height: 60,
    lineHeight: 35,
    marginBottom: 40,
    marginTop: 120,
    paddingTop: 10,
    textAlign: "center"
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
