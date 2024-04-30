import { StyleSheet, Text, View } from "react-native";
import { loadFont } from "../misc/loadFont";
import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGLogo } from "../misc/loadSVG";

const LandingScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SvgXml xml={SVGLogo}/>
      <Text style={styles.logoText}>academeet</Text>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  logoText: {
    fontFamily: "lato-bold",
    fontSize: wp(9),
    color: "#FF9E00",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023E8A",
    flex: 1,
  },
});
