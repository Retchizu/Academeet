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
import GenderScreen from "./screens/GenderScreen";
import TopicScreen from "./screens/TopicScreen";
import InterestScreen from "./screens/InterestScreen";
import CardScreen from "./screens/CardScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="RegisterScreen"
      screenOptions={{ headerShown: false, statusBarHidden: true }}
    >
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="CardScreen" component={CardScreen} />
      <Stack.Screen name="TopicScreen" component={TopicScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
      <Stack.Screen name="BlurScreen" component={BlurScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScren} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProgramScreen" component={ProgramScreen} />
      <Stack.Screen name="AddPhotoScreen" component={AddPhotoScreen} />
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="InterestScreen" component={InterestScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
