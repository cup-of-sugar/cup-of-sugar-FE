import "react-native-gesture-handler";
import * as React from "react";
import {
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RequestScreen } from "./screens/RequestScreen";
import HomeScreen from "./screens/HomeScreen";
import LinksScreen from "./screens/LinksScreen";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import cup from "./assets/images/cup.png";
import Colors from "./constants/Colors";
import MenuDrawer from "./components/MenuDrawer";
import { AppRegistry } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: "https://fierce-tundra-54482.herokuapp.com/graphql"
});

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        setInitialNavigationState(await getInitialState());

        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="Root"
                component={HomeScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: "Cup of Sugar",
                  headerRight: () => <Image source={cup} style={styles.logo} />,
                  headerLeft: () => <MenuDrawer />
                }}
              />
              <Stack.Screen name="RequestScreen" component={RequestScreen} />
              <Stack.Screen
                name="Details"
                component={ItemDetailsScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerRight: () => <Image source={cup} style={styles.logo} />,
                  headerTintColor: "white"
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent("Cup of Sugar", () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logo: {
    margin: 15,
    height: 42,
    width: 57
  }
});
