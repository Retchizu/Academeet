import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { loadFont } from "../misc/loadFont";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import { SVGnext, SVGprevious } from "../misc/loadSVG";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const InterestScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [name, setName] = useState("");
  const [selectedTraits, setSelectedTraits] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const toggleTrait = (trait) => {
    // Check if the trait is already selected
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(item => item !== trait)); // Deselect the trait
    } else {
      setSelectedTraits([...selectedTraits, trait]); // Select the trait
    }
  };

  const goToNextScreen = () => {
    navigation.navigate("ProgramScreen");
  };

  if (!fontLoaded) {
    return null;
  }

  const personalityTraits = [
    "Curious",
    "Creative",
    "Confident",
    "Empathetic",
    "Organized",
    "Adventurous",
    "Analytical",
    "Ambitious",
    "Diligent",
    "Adaptable",
    "Detail-oriented",
    "Motivated",
    "Patient",
    "Optimistic",
    "Collaborative",
    "Resilient",
    "Independent",
    "Friendly",
    "Energetic",
    "Calm",
    "Communicative",
    "Perseverant",
    "Innovative",
    "Resourceful",
    "Punctual",
    "Responsible",
    "Flexible",
    "Honest",
    "Proactive",
    "Sociable",
  ];
  personalityTraits.sort();

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={0.7} width={wp(90)} color="#FF6D00" />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>Tell us more about yourself!</Text>
        <Text style={styles.description}>This will help you to present yourself {"\n"}in a way where you can show your {"\n"}interest to others.</Text>
        <Text style={styles.onlyText}> Choose 5 personal traits </Text>

        {/* Display the personality traits */}
        <View style={styles.traitsContainer}>
          {personalityTraits.map((trait, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.traitButton,
                selectedTraits.includes(trait) && styles.traitSelected,
              ]}
              onPress={() => toggleTrait(trait)}
            >
              <Text style={styles.traitText}>{trait}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={() => navigation.navigate("TopicScreen")}
      >
        <SvgXml xml={SVGnext} width={45} height={45} style={styles.nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.previousIconContainer}
        onPress={() => navigation.navigate("GenderScreen")}
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
    fontFamily: "lato-light",
    fontSize: wp(4),
  },
  inputField: {
    fontFamily: "lato-light",
    width: wp(65),
    height: hp(6),
    borderWidth: wp(0.3),
    borderColor: "#414042",
    borderRadius: wp(5),
    marginTop: hp(3),
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
    paddingLeft: wp(20)
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
