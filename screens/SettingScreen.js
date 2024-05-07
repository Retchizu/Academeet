import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { loadFont } from "../misc/loadFont";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SVGprevious } from "../misc/loadSVG";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SettingScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const settingChoices = [
    {
      key: 2,
      name: "Developers",
    },
    {
      key: 3,
      name: "About the app",
    },
    {
        key: 4,
        name: "Log out",
    },
  ];

  const handleChoicesFunctionality = (key) => {
    switch (key) {
      case 1:
        return alert("Appearance");
      case 2:
        navigation.navigate("DevelopersScreen");
        break;
      case 3:
        navigation.navigate("AboutAppScreen");
        break;
      default:
        break;
    }
  };

  const goBack = () => {
    console.log("Going back...");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.svgContainer}>
          <SvgXml
            xml={SVGprevious}
            width={45}
            height={45}
            style={styles.previousIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>settings</Text>
      </View>
      <View style={styles.mapContainer}>
        {settingChoices.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => handleChoicesFunctionality(item.key)}
          >
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    marginTop: hp(5), // Adjust as needed
    paddingHorizontal: hp(2), // Adjust as needed
  },
  svgContainer: {
    position: "absolute",
    left: 20,
  },
  previousIcon: {
    marginLeft: wp(2),
    marginRight: wp(5),
    marginBottom: hp(2)
  },
  headerText: {
    fontSize: wp(7), // Adjust as needed
    fontFamily: "lato-bold",
    color: "#FF9E00",
    paddingLeft: wp(35),
    paddingBottom: hp(3)
  },
  settingContainer: {
    marginVertical: hp(1), // Adjust as needed
    borderBottomColor: "#10ABD5",
    borderBottomWidth: wp(0.5),
    paddingHorizontal: wp(2), // Adjust as needed
    justifyContent: "flex-start",
    paddingBottom: hp(1),

  },
  settingText: { 
    fontFamily: "lato-regular",
    fontSize: wp(4.5), 
    color: "#FFFFFF",
  },
  mapContainer: {
    marginTop: hp(3),
    width: wp(80),
    backgroundColor: "#0077B6",
    borderRadius: hp(2),
    borderWidth: hp(0.1),
    borderColor: "#0077B6",
    padding: hp(1),
    alignSelf: "center", // Horizontally center the container
  },
});

export default SettingScreen;
