// NameScreen.js

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import { SVGnext } from "../misc/loadSVG";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useUserContext } from "../context/UserContext";

const NameScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [name, setName] = useState("");
  const { user, putAttribute } = useUserContext();
  console.log(user);

  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const goToNextScreen = () => {
    if (!name.trim()) {
      console.log("Please enter your name"); //toast
      return;
    }

    putAttribute("fullName", name);
    navigation.navigate("YearLevelScreen");
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={0.1} width={wp(90)} color="#FF6D00" />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>What's your name?</Text>
        <Text style={styles.description}>Please introduce yourself.</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Enter your full name here"
          placeholderTextColor="#6D6D6D"
        />
      </View>
      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={goToNextScreen}
      >
        <SvgXml xml={SVGnext} width={45} height={45} style={styles.nextIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  logoText: {
    fontFamily: "lato-regular",
    fontSize: wp(8),
    color: "#FFFFFF",
    textAlign: "left",
    paddingRight: wp(25),
  },
  description: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
    marginTop: hp(1),
    textAlign: "left",
    paddingLeft: wp(1),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023E8A",
  },
  titleContainer: {
    position: "absolute",
    top: hp(7),
    alignItems: "flex-start",
    paddingLeft: wp(5),
  },
  inputField: {
    fontFamily: "lato-light",
    width: wp(65),
    height: hp(6),
    borderWidth: wp(0.3),
    borderColor: "#414042",
    borderRadius: wp(5),
    marginHorizontal: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: "#FFFFFF",
    fontSize: wp(4),
  },
  textInputContainer: {
    alignSelf: "center",
    padding: hp(2),
  },
  nextIconContainer: {
    position: "absolute",
    bottom: hp(5),
    right: wp(2),
  },
  nextIcon: {
    tintColor: "#FFFFFF",
    paddingRight: wp(20),
  },
  progressBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
  },
});
