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
          onPress={() => navigation.goBack()}
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
          Welcome to Academeet, where connecting with fellow students who share
          your academic interests is effortless. With Academeet, discover
          like-minded peers and engage in meaningful learning experiences
          together. Our app utilizes an exhaustive search algorithm to match you
          with students who have similar topics of interest, ensuring every
          connection is relevant and valuable. Whetger you're seeking study
          partners, projec collaborators, or simply want to expand your academic
          network, Academeet is here to facilitate your journey. Embrace the
          opportunity to meet and learn simultaneously with Academeet.
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
    marginBottom: hp(1),
  },
  headerText: {
    fontSize: wp(7),
    fontFamily: "lato-bold",
    color: "#FF9E00",
    paddingBottom: hp(2),
    paddingLeft: wp(15),
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
    fontSize: hp(2.2),
    color: "#FFFFFF",
    marginBottom: hp(2),
    textAlign: "justify",
  },
});

export default AboutAppScreen;
