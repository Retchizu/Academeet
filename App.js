import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import SplashScren from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BlurScreen from "./screens/BlurScreen";
import TopicScreen from "./screens/TopicScreen";
import GenderScreen from "./screens/GenderScreen";
import ReminderScreen from "./screens/ReminderScreen";
import ProgramScreen from "./screens/ProgramScreen";
import AddPhotoScreen from "./screens/AddPhotoScreen";
import NameScreen from "./screens/NameScreen";
import InterestScreen from "./screens/InterestScreen";
import CardScreen from "./screens/CardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";
import { FontAwesome } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { SVGLogo } from "./misc/loadSVG";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        height: 70,
        bottom: 25,
        right: 20,
        left: 20,
        elevation: 0,
        backgroundColor: "#0077B6", // Changed background color
        borderTopWidth: 0,
        borderRadius: 20,
      },
      tabBarIconStyle: {
        marginBottom: 5,
      },
      tabBarActiveTintColor: "#FF9E00",
      tabBarInactiveTintColor: "#FFF", // Changed icon color to white
      tabBarShowLabel: false,
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: -5,
      },
    }}
  >
    <Tab.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="CardScreen"
      component={CardScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <SvgXml
            xml={SVGLogo}
            width={size * 2.5}
            height={size * 2.5}
            fill={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="comment" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="TopicScreen" component={TopicScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="BlurScreen" component={BlurScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScren} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProgramScreen" component={ProgramScreen} />
      <Stack.Screen name="AddPhotoScreen" component={AddPhotoScreen} />
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="InterestScreen" component={InterestScreen} />
      <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
