import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import { SVGLogo } from "../misc/loadSVG";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const ReminderScreen = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }
  

  // Todo: Make it so that when the user already agreed,
  // This window won't show again.
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <SvgXml xml={SVGLogo} style={styles.logo} />
        </View>
        <Text style={styles.heading}>Before you swipe</Text>
        <Text style={styles.text}>
          Welcome! We’re excited to be a part of your learning.
        </Text>
        <Text style={styles.text}>
          Here, we treat everyone with kindness, respect, and professionalism,
          no matter their race, religion, ethnicity, and program.
        </Text>
        <Text style={styles.text}>
          In our mission to make an environment where everyone can learn, meet
          new people, and ultimately, gain new knowledge that they can apply to
          their lives, we ask you to adhere to these guidelines.
        </Text>
        <Text style={styles.text}>
          And remember: We’ve always got your back! For the sake of learning,
          Pixel Quest (Developers).
        </Text>
      </View>
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate("CardScreen")}
      >
        <Text style={styles.buttonText}>I agree</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#023E8A",
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  content: {
    marginTop: hp(2),
    flex: 1,
    width: wp(90),
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logo: {
    marginBottom: hp(0.2),
  },
  heading: {
    fontFamily: "lato-light",
    fontSize: wp(6),
    color: "#FFFFFF",
    marginBottom: hp(3),
  },
  text: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
    marginBottom: hp(2),
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#FF9E00",
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(10),
    borderRadius: wp(4),
    alignItems: "center",
    position: "absolute",
    bottom: hp(3),
    width: wp(60),
  },
  buttonText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
  },
});
