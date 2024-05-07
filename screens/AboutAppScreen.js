import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { loadFont } from "../misc/loadFont";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SVGprevious, reminderSVG } from "../misc/loadSVG";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AboutAppScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SvgXml
          xml={SVGprevious}
          width={45}
          height={45}
          style={styles.previousIcon}
          onPress={() => navigation.goBack()} // Add onPress here
        />
        <Text style={styles.headerText}>about app</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <SvgXml
            xml={reminderSVG}
            width={90}
            height={90}
            style={styles.logo}
          />
        </View>
        <Text style={styles.text}>
          lorem epsum, hardcoded shizz wala pako maisim Jeez Rick, oh jeez dang
          Nobody exists on purpose. Nobody belongs anywhere. When you are an
          asshole, it doesn't matter how right you are. Nobody wants to give
          you the satisfaction. Well, then get your shit together, get it all
          together, and put it in a backpack, all your shit, so it's together.
          And if you gotta take it somewhere, take it somewhere, you know, take
          it to the shit store and sell it, or put it in the shit museum. I
          don't care what you do, you just gotta get it together. Get your shit
          together.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(5),
    paddingHorizontal: hp(1),
  },
  previousIcon: {
    marginLeft: wp(2),
    marginRight: wp(5),
    marginBottom: hp(1)
  },
  headerText: {
    fontSize: wp(7),
    fontFamily: "lato-bold",
    color: "#FF9E00",
    paddingBottom: hp(2),
    paddingLeft: wp(15)
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logo: {
    marginBottom: hp(1),
  },
  content: {
    marginTop: hp(2),
    flex: 1,
    width: wp(80),
    marginLeft: wp(8),
  },
  text: {
    fontFamily: "lato-light",
    fontSize: hp(2),
    color: "#FFFFFF",
    marginBottom: hp(2),
    textAlign: "justify",
  },
});

export default AboutAppScreen;
