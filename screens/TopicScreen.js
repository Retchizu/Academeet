import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import { SVGnext, SVGprevious } from "../misc/loadSVG";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const topics = [
  { key: 1, label: "Programming" },
  { key: 2, label: "Animation" },
  { key: 3, label: "Networking" },
  { key: 4, label: "React Native" },
  { key: 5, label: "Mongo DB" },
  { key: 6, label: "Design" },
  { key: 7, label: "" },
  { key: 8, label: "Others" },
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

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Choose a Topic</Text>
        <Text style={styles.description}>
          This is the aspect that will match you with {"\n"}other students.
        </Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          {topics.map((item) => (
            <View key={item.key} style={styles.button}>
              <Text style={styles.label}>{item.label}</Text>
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={[
                    styles.genderIndicator,
                    {
                      backgroundColor: selectedTopics.includes(item.label)
                        ? "#FF9E00"
                        : "white",
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={() => navigation.navigate("TopicScreen")}
      >
        <SvgXml xml={SVGnext} width={45} height={45} style={styles.nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.previousIconContainer}
        onPress={() => navigation.navigate("InterestScreen")}
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

export default TopicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
    paddingTop: hp(8),
    paddingHorizontal: wp(10),
  },
  textContainer: {
    marginBottom: hp(3),
  },
  title: {
    fontFamily: "lato-regular",
    fontSize: wp(7),
    color: "#FFFFFF",
    marginBottom: hp(3),
  },
  description: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: hp(9),
  },
  buttonContainer: {
    paddingHorizontal: wp(7),
    paddingBottom: hp(1),
  },
  button: {
    backgroundColor: "white",
    borderRadius: wp(5),
    padding: wp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: wp(2),
    width: wp(65),
  },
  label: {
    fontSize: wp(4),
    color: "#6D6D6D",
    textAlign: "center",
    textAlignVertical: "center",
  },
  genderIndicator: {
    width: wp(10),
    height: wp(8),
    borderRadius: wp(5),
    borderWidth: wp(0.2),
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
    paddingRight: wp(20)
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
