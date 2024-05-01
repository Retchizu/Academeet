import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "./screens/LandingScreen";
import SplashScren from "./screens/SplashScreen";
import LogInScreen from "./screens/LogInScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScren}
        options={{ headerShown: false, statusBarHidden: true }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      />
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
