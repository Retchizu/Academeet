import { StyleSheet, Text, View } from "react-native";
import { loadFont } from "../misc/loadFont";
import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGLogo } from "../misc/loadSVG";
import LandingScreen from "./LandingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../context/UserContext";

const SplashScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isAutoLogInRequest, setIsAutoLogInRequest] = useState(true);
  const navigation = useNavigation();
  const { setUser } = useUserContext();

  useEffect(() => {
    const autoLogIn = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");
        const userName = await AsyncStorage.getItem("userName");
        console.log(email, password, userName);
        if (email && password && userName) {
          await auth.signInWithEmailAndPassword(email, password);
          const data = await db.collection("User").doc(userName).get();
          if (data.exists) {
            const {
              userName,
              email,
              fullName,
              selectedTrait,
              userGender,
              userProgram,
              userTopic,
              yearLevel,
            } = data.data();
            if (
              email &&
              fullName &&
              selectedTrait &&
              userGender &&
              userName &&
              userProgram &&
              userTopic &&
              yearLevel
            ) {
              setUser(data.data());
              navigation.replace("TabNavigator");
            } else {
              setUser(data.data());
              navigation.replace("NameScreen");
            }
          }
        }
        setIsAutoLogInRequest(false);
        setIsShowSplash(false);
      } catch (error) {
        console.log(error.message);
        setIsAutoLogInRequest(false);
        setIsShowSplash(false);
      }
    };
    autoLogIn();
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isShowSplash && isAutoLogInRequest ? (
        <>
          <SvgXml xml={SVGLogo} />
          <Text style={styles.logoText}>academeet</Text>
        </>
      ) : (
        <LandingScreen />
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logoText: {
    fontFamily: "lato-bold",
    fontSize: wp(8),
    color: "#FF9E00",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023E8A",
    flex: 1,
  },
});
