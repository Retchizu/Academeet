import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

const topicsLanguage = [
  { key: 1, label: "Java" },
  { key: 2, label: "Python" },
  { key: 3, label: "C++" },
  { key: 4, label: "JavaScript" },
  { key: 5, label: "Ruby" },
  { key: 6, label: "Swift" },
  { key: 7, label: "Artificial Intelligence" },
  { key: 9, label: "Data Science" },
  { key: 10, label: "Machine Learning" },
  { key: 11, label: "Cybersecurity" },
  { key: 12, label: "Web Development" },
  { key: 13, label: "Mobile App Development" },
  { key: 14, label: "Blockchain" },
  { key: 15, label: "Internet of Things" },
  { key: 16, label: "Cloud Computing" },
  { key: 17, label: "Augmented Reality/ Virtual Reality" },
  { key: 18, label: "Quantum Computing" },
  { key: 19, label: "Agile Methodology" },
  { key: 20, label: "DevOps" },
  { key: 21, label: "Software Testing" },
  { key: 22, label: "Software Architecture" },
  { key: 23, label: "Finance & Technology" },
  { key: 24, label: "Healthcare & Technology" },
  { key: 25, label: "Gaming & Technology" },
  { key: 26, label: "Education Technology" },
  { key: 27, label: "E-commerce & Technology" },
];

const TopicScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigation = useNavigation();
  const [progressValue, setProgressValue] = useState(0.5);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(0.6);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((item) => item !== topic));
    } else {
      if (selectedTopics.length < 5) {
        setSelectedTopics([...selectedTopics, topic]);
      } else {
        alert("You can only select up to 5 topics.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>Choose a Topic</Text>
        <Text style={styles.description}>
          This is the aspect that will match you with {"\n"}other students.
        </Text>
        <Text style={styles.onlyText}> Choose 5 topics you are interested in </Text>
      </View>

      <ScrollView style={styles.topicsContainer}>
        {topicsLanguage.map((topic) => (
          <TouchableOpacity
            key={topic.key}
            style={[
              styles.topicButton,
              selectedTopics.includes(topic.label) && styles.topicSelected,
            ]}
            onPress={() => toggleTopic(topic.label)}
          >
            <Text style={styles.topicText}>{topic.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={() => navigation.navigate("ReminderScreen")}
      >
        <SvgXml xml={SVGnext} width={45} height={45} style={styles.nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.previousIconContainer}
        onPress={() => navigation.navigate("InterestScreen")}
      >
        <SvgXml xml={SVGprevious} width={45} height={45} style={styles.previousIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
  },
  progressBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
  },
  titleContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  logoText: {
    fontFamily: "lato-regular",
    fontSize: wp(8),
    color: "#FFFFFF",
    textAlign: "left",
  },
  description: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
    marginTop: hp(1),
    textAlign: "left",
  },
  onlyText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
    marginTop: hp(3),
    textAlign: "left",
  },
  topicsContainer: {
    marginTop: hp(2),
    paddingHorizontal: wp(5),
  },
  topicButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
    margin: wp(1),
  },
  topicSelected: {
    backgroundColor: "#FF6D00",
  },
  topicText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
  },
  nextIconContainer: {
    position: "absolute",
    bottom: hp(5),
    right: wp(2),
  },
  previousIconContainer: {
    position: "absolute",
    bottom: hp(5),
    left: wp(2),
  },
  nextIcon: {
    tintColor: "#FFFFFF",
  },
  previousIcon: {
    tintColor: "#FFFFFF",
  },
});
