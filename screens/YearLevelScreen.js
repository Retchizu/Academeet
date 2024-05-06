import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
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
import DropDownPicker from "react-native-dropdown-picker";
import { useUserContext } from "../context/UserContext";

const YearLevelScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [progressValue, setProgressValue] = useState(0.1);
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState([
    { label: "Freshman", value: "Freshman" },
    { label: "Sophomore", value: "Sophomore" },
    { label: "Junior", value: "Junior" },
    { label: "Senior", value: "Senior" },
  ]);

  const { putAttribute, user, removeAttribute } = useUserContext();

  const navigation = useNavigation();
  const containerRef = useRef(null);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(0.2);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  console.log("selected", selectedYear);

  const goToNextScreen = () => {
    console.log("Selected year:", selectedYear);
    if (!selectedYear.trim()) {
      console.log("Please select your year");
      return;
    }
    putAttribute("yearLevel", selectedYear);
    navigation.navigate("ProgramScreen");
  };

  const goToPreviousScreen = () => {
    if (user.yearLevel) {
      removeAttribute("yearLevel");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>What year are you in?</Text>
        <Text style={styles.description}>
          So we can help you find people within the same bracket.
        </Text>
      </View>
      <DropDownPicker
        open={open}
        value={selectedYear}
        items={year}
        setOpen={setOpen}
        setValue={setSelectedYear}
        setItems={setYear}
        containerStyle={styles.pickerContainer}
        style={styles.inputField}
        dropDownStyle={styles.dropdownStyle}
        labelStyle={styles.labelStyle}
        dropDownItemStyle={styles.dropDownItemStyle}
        placeholder="Select your year level"
      />
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

export default YearLevelScreen;

const styles = StyleSheet.create({
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
  pickerContainer: {
    width: wp(70),
    marginTop: hp(3),
    zIndex: 1000,
  },
  inputField: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp(2),
    borderWidth: wp(0.3),
    borderColor: "#CCCCCC",
    paddingLeft: wp(2),
  },
  dropdownStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp(2),
    borderWidth: wp(0.3),
    borderColor: "#CCCCCC",
  },
  labelStyle: {
    fontFamily: "lato-regular",
    fontSize: wp(4),
    color: "#414042",
    paddingLeft: wp(2),
  },
  dropDownItemStyle: {
    fontFamily: "lato-bold",
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
  },
});
