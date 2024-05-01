import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGLogo } from "../misc/loadSVG";

const LandingScreen = () => {
  const navigation = useNavigation();

  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setFontLoaded(true);
    }, 1000);
  }, []);

  if (!fontLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SvgXml xml={SVGLogo} />
      <Text style={styles.logoText}>academeet</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LogInScreen")}
          style={[styles.button, styles.loginButton]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={[styles.button, styles.registerButton]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

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
  buttonsContainer: {
    flexDirection: "row",
    marginTop: hp(4),
  },
  button: {
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(6),
    borderRadius: 18,
    marginRight: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: wp(30),
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#0077B6",
  },
  loginButton: {
    backgroundColor: "#FF9E00",
  },
  buttonText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
  },
});
