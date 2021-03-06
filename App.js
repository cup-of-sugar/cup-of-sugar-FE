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
import RequestScreen from "./screens/RequestScreen";
import HomeScreen from "./screens/HomeScreen";
import LoanDetailsScreen from "./screens/LoanDetailsScreen";
import SuccessScreen from "./screens/SuccessScreen";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import MyItemsScreen from "./screens/MyItemsScreen";
import PathScreen from "./screens/PathScreen";
import ComposeMessageScreen from "./screens/ComposeMessageScreen";
import LoginScreen from "./screens/LoginScreen";
import LenderRequestScreen from "./screens/LenderRequestScreen";
import MessagesScreen from "./screens/MessagesScreen";
import MessageDetailsScreen from "./screens/MessageDetailsScreen";
import OffersAndRequestsScreen from "./screens/OffersAndRequestsScreen";
import useLinking from "./navigation/useLinking";
import cup from "./assets/images/cup.png";
import Colors from "./constants/Colors";
import MenuDrawer from "./components/MenuDrawer";
import { AppRegistry } from "react-native";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./utilities/client";

const Stack = createStackNavigator();

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
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Path"
                component={PathScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Home"
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
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Loan Details"
                component={LoanDetailsScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: "Details",
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="My Items"
                component={MyItemsScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="LenderRequests"
                component={LenderRequestScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Offers/Requests"
                component={OffersAndRequestsScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Message"
                component={MessageDetailsScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Search Results"
                component={SearchResultsScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
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
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Success!"
                component={SuccessScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Request"
                component={RequestScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
                  headerTintColor: "white"
                }}
              />
              <Stack.Screen
                name="Compose"
                component={ComposeMessageScreen}
                options={{
                  headerStyle: {
                    backgroundColor: Colors.darkBlue,
                    height: 120
                  },
                  headerTitleStyle: {
                    color: "white",
                    fontSize: 25
                  },
                  headerTitle: () => <Image source={cup} style={styles.logo} />,
                  headerRight: () => <MenuDrawer />,
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
    height: 70,
    width: 70
  }
});
