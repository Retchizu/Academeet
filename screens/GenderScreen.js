import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import { SVGnext, SVGprevious } from "../misc/loadSVG";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useUserContext } from "../context/UserContext";

const GenderScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const navigation = useNavigation();
  const [progressValue, setProgressValue] = useState(0.45);
  const { putAttribute, user, removeAttribute } = useUserContext();

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
    if (!selectedGender.trim()) {
      console.log("Please identify your gender"); //toast
      return;
    }
    putAttribute("userGender", selectedGender);
    navigation.navigate("InterestScreen");
  };

  const goToPreviousScreen = () => {
    if (user.userGender) {
      removeAttribute("userGender");
    }
    navigation.goBack();
  };
  console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>How do you identify?</Text>
        <Text style={styles.description}>Everyone's welcome on Academeet</Text>
        <View style={styles.genderContainer}>
          <View style={{ top: wp(40) }}>
            <View style={styles.genderOptionWrapper}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  { paddingHorizontal: wp(11) },
                  selectedGender === "Man" && styles.selectedGenderOption,
                ]}
                onPress={() => setSelectedGender("Man")}
              >
                <Text style={styles.genderOptionText}>Man</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.genderOptionWrapper}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  selectedGender === "Woman" && styles.selectedGenderOption,
                ]}
                onPress={() => setSelectedGender("Woman")}
              >
                <Text style={styles.genderOptionText}>Woman</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={() => goToNextScreen()}
      >
        <SvgXml xml={SVGnext} width={45} height={45} style={styles.nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.previousIconContainer}
        onPress={() => goToPreviousScreen()}
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
  genderContainer: {
    marginTop: hp(2),
    flexDirection: "column",
  },
  genderOptionWrapper: {
    paddingLeft: wp(25),
    alignItems: "center",
  },
  genderOption: {
    backgroundColor: "#FFFFFF",
    paddingVertical: hp(1),
    paddingHorizontal: wp(8),
    borderRadius: wp(5),
    marginVertical: hp(1),
  },
  selectedGenderOption: {
    backgroundColor: "#FF6D00",
  },
  genderOptionText: {
    fontFamily: "lato-regular",
    fontSize: wp(5),
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
