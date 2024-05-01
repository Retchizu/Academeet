import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import { SVGnext } from "../misc/loadSVG";
import GenderButton from "../components/GenderButton";

const GenderScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const goToNextScreen = () => {
    navigation.navigate("AboutYourselfScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>How do you {"\n"}identify?</Text>
        <Text style={styles.description}>Everyone's welcome on Academeet</Text>
      </View>
      <View style={styles.buttonContainer}>
        <GenderButton
          label="Man"
          selectedGender={selectedGender}
          onPress={() => setSelectedGender("Man")}
        />
        <GenderButton
          label="Woman"
          selectedGender={selectedGender}
          onPress={() => setSelectedGender("Woman")}
        />
        <GenderButton
          label="Non-binary"
          selectedGender={selectedGender}
          onPress={() => setSelectedGender("Non-binary")}
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

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
    justifyContent: "top",
    alignItems: "flex-start",
    paddingLeft: wp(10),
    paddingTop: hp(8),
  },
  textContainer: {
    marginHorizontal: wp(5),
    marginVertical: hp(5),
  },
  title: {
    fontFamily: "lato-regular",
    fontSize: wp(7),
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: hp(3),
  },
  description: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
    textAlign: "left",
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
});
