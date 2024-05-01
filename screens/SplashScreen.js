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

const SplashScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isShowSplash ? (
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
