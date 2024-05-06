import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
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

const InterestScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [progressValue, setProgressValue] = useState(0.5);
  const navigation = useNavigation();

  const { putAttribute, user, removeAttribute } = useUserContext();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
    if (user.selectedTraits) {
      setSelectedTraits(user.selectedTraits);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(0.7);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTrait = (trait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter((item) => item !== trait));
    } else {
      if (selectedTraits.length < 5) {
        setSelectedTraits([...selectedTraits, trait]);
      }
    }
  };

  if (!fontLoaded) {
    return null;
  }

  const personalityTraits = [
    { key: 1, label: "Curious" },
    { key: 2, label: "Creative" },
    { key: 3, label: "Confident" },
    { key: 4, label: "Empathetic" },
    { key: 5, label: "Organized" },
    { key: 6, label: "Adventurous" },
    { key: 7, label: "Analytical" },
    { key: 8, label: "Ambitious" },
    { key: 9, label: "Diligent" },
    { key: 10, label: "Adaptable" },
    { key: 11, label: "Detail-oriented" },
    { key: 12, label: "Motivated" },
    { key: 13, label: "Patient" },
    { key: 14, label: "Optimistic" },
    { key: 15, label: "Collaborative" },
    { key: 16, label: "Resilient" },
    { key: 17, label: "Independent" },
    { key: 18, label: "Friendly" },
    { key: 19, label: "Energetic" },
    { key: 20, label: "Calm" },
    { key: 21, label: "Communicative" },
    { key: 22, label: "Perseverant" },
    { key: 23, label: "Innovative" },
    { key: 24, label: "Punctual" },
    { key: 25, label: "Responsible" },
    { key: 26, label: "Flexible" },
    { key: 27, label: "Proactive" },
    { key: 29, label: "Resourceful" },
  ];
  personalityTraits.sort((a, b) => a.label.localeCompare(b.label));
  console.log("user with traits", user.selectedTraits);
  const goToNextScreen = () => {
    if (!selectedTraits.length) {
      console.log("Please select atleast 1 trait");
      return;
    }
    if (user.selectedTrait && user.selectedTrait.length) {
      removeAttribute("selectedTrait");
    }

    putAttribute("selectedTrait", selectedTraits);
    navigation.navigate("TopicScreen");
  };

  const goToPreviousScreen = () => {
    if (user.selectedTrait) {
      removeAttribute("selectedTrait");
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>Tell us more about yourself!</Text>
        <Text style={styles.description}>
          This will help you to present yourself {"\n"}in a way where you can
          show your {"\n"}interest to others. This will help you to present
          yourself in a way where you can show your interest to others.
        </Text>
        <Text style={styles.onlyText}> Choose 5 personal traits </Text>
        <View style={{ height: hp(50) }}>
          <ScrollView>
            <View style={styles.traitsContainer}>
              {personalityTraits.map((trait, index) => (
                <TouchableOpacity
                  key={trait.key}
                  style={[
                    styles.traitButton,
                    selectedTraits.includes(trait.label) &&
                      styles.traitSelected,
                  ]}
                  onPress={() => toggleTrait(trait.label)}
                >
                  <Text style={styles.traitText}>{trait.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          flex: 1,
          alignItems: "flex-end",
          marginBottom: hp(3),
        }}
      >
        <TouchableOpacity onPress={() => goToPreviousScreen()}>
          <SvgXml
            xml={SVGprevious}
            width={45}
            height={45}
            style={styles.previousIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToNextScreen()}>
          <SvgXml
            xml={SVGnext}
            width={45}
            height={45}
            style={styles.nextIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InterestScreen;

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
  onlyText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
    marginTop: hp(3),
    textAlign: "left",
    paddingLeft: wp(1),
  },
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
  },
  titleContainer: {
    position: "absolute",
    top: hp(7),
    alignItems: "flex-start",
    paddingLeft: wp(5),
  },
  traitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: hp(2),
  },
  traitButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
    margin: wp(1),
  },
  traitSelected: {
    backgroundColor: "#FF6D00",
  },
  traitText: {
    fontFamily: "lato-regular",
    fontSize: wp(3.5),
  },
  previousIconContainer: {
    position: "absolute",
  },
  nextIconContainer: {
    position: "absolute",
  },
  nextIcon: {
    tintColor: "#FFFFFF",
    paddingRight: wp(20),
  },
  previousIcon: {
    tintColor: "#FFFFFF",
    paddingLeft: wp(20),
  },
  progressBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: hp(2),
  },
});
