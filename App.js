import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "./screens/LandingScreen";
import SplashScren from "./screens/SplashScreen";
import LogInScreen from "./screens/LogInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BlurScreen from "./screens/BlurScreen";
import ReminderScreen from "./screens/ReminderScreen";
import ProgramScreen from "./screens/ProgramScreen";
import AddPhotoScreen from "./screens/AddPhotoScreen";
import NameScreen from "./screens/NameScreen";


const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="NameScreen">
      <Stack.Screen
        name="ReminderScreen"
        component={ReminderScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      />
      <Stack.Screen
        name="BlurScreen"
        component={BlurScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      />
    
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
      <Stack.Screen
        name="ProgramScreen"
        component={ProgramScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      />
      <Stack.Screen
        name="AddPhotoScreen"
        component={AddPhotoScreen}
        options={{ headerShown: false, statusBarHidden: true }}
      />
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
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
