import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import { SVGnext, SVGprevious } from "../misc/loadSVG";
import GenderButton from "../components/GenderButton";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const GenderScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const navigation = useNavigation();
  const [progressValue, setProgressValue] = useState(0.45);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(0.5);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const goToNextScreen = () => {
    navigation.navigate("AboutYourselfScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>How do you {"\n"}identify?</Text>
        <Text style={styles.description}>Everyone's welcome on Academeet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setSelectedGender("Man")}>
          <GenderButton
            label="Man"
            selectedGender={selectedGender}
            onPress={() => setSelectedGender("Man")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedGender("Woman")}>
          <GenderButton
            label="Woman"
            selectedGender={selectedGender}
            onPress={() => setSelectedGender("Woman")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={() => navigation.navigate("InterestScreen")}
      >
        <SvgXml xml={SVGnext} width={45} height={45} style={styles.nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.previousIconContainer}
        onPress={() => navigation.navigate("AddPhotoScreen")}
      >
        <SvgXml
          xml={SVGprevious}
          width={45}
          height={45}
          style={styles.previousIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: wp(10),
  },
  textContainer: {
    position: "absolute",
    top: hp(7),
    alignItems: "flex-start",
    paddingLeft: wp(8),
  },
  title: {
    fontFamily: "lato-regular",
    fontSize: wp(8),
    color: "#FFFFFF",
    textAlign: "left",
    paddingRight: wp(18),
  },
  description: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
    marginTop: hp(1),
    textAlign: "left",
    paddingRight: wp(18),
  },
  buttonContainer: {
    marginHorizontal: wp(7),
    marginVertical: hp(5),
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
  previousIcon: {
    tintColor: "#FFFFFF",
    paddingLeft: wp(20),
  },
  previousIconContainer: {
    position: "absolute",
    bottom: hp(5),
    left: wp(2),
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
