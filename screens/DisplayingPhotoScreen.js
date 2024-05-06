import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import { SVGnext, SVGprevious, SVGImage } from "../misc/loadSVG";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const DisplayingPhotoScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const containerRef = useRef(null);
  const navigation = useNavigation();
  const [progressValue, setProgressValue] = useState(0.4);
  const route = useRoute();
  const uri = route.params?.uri;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(0.45);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>Add your first photo!</Text>
        <Text style={styles.description}>
          This is something to make you known for other students like you. Of
          course, you can definitely change it later.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <SvgXml xml={SVGImage} width={350} height={438} />
        {uri && <Image source={{ uri }} style={styles.image} />}
      </View>

      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={() => navigation.navigate("GenderScreen")}
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
export default DisplayingPhotoScreen;

const styles = StyleSheet.create({
  progressBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
    zIndex: 1,
  },
  logoText: {
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
  previousIconContainer: {
    position: "absolute",
    bottom: hp(5),
    left: wp(2),
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
  imageContainer: {
    marginTop: hp(5),
    position: "relative",
  },
  image: {
    position: "absolute",
    top: wp(13.6),
    left: wp(6.1),
    width: wp(75),
    height: hp(40),
    borderRadius: 10,
  },
});
