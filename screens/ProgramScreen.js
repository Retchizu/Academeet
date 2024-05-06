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
import { dropDown, SVGnext, SVGprevious } from "../misc/loadSVG";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import DropDownPicker from "react-native-dropdown-picker";
import { useUserContext } from "../context/UserContext";
import Toast from "react-native-toast-message";

const ProgramScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [progressValue, setProgressValue] = useState(0.2);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Computer Science", value: "Computer Science" },
    { label: "Information Technology", value: "Information Technology" },
    { label: "Information System", value: "Information System" },
    {
      label: "Entertainment & Multimedia Computing",
      value: "Entertainment & Multimedia Computing",
    },
  ]);
  items.sort();

  const containerRef = useRef(null);
  const navigation = useNavigation();
  const { putAttribute, user, removeAttribute } = useUserContext();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(0.3);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const handleSelectProgram = (program) => {
    setSelectedProgram(program.label);
    console.log("Selected program:", program.label); //for testing
  };

  const goToNextScreen = () => {
    if (!selectedProgram.trim()) {
      Toast.show({
        type: "error",
        text1: "Please select a program",
      });
      return;
    }
    putAttribute("userProgram", selectedProgram);
    navigation.navigate("AddPhotoScreen");
  };

  const goToPreviousScreen = () => {
    if (user.userProgram) {
      removeAttribute("userProgram");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>Select Your Program</Text>
        <Text style={styles.description}>
          So we can help you find people within the same field.
        </Text>
      </View>
      <DropDownPicker
        open={open}
        value={selectedProgram}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedProgram}
        setItems={setItems}
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

export default ProgramScreen;

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
    zIndex: 1,
  },
  inputField: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp(2),
    borderWidth: wp(0.3),
    borderColor: "#CCCCCC",
    paddingHorizontal: wp(2),
  },
  dropdownModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp(2),
    borderWidth: wp(0.3),
    borderColor: "#CCCCCC",
    maxHeight: hp(30),
  },
  optionText: {
    fontFamily: "lato-regular",
    fontSize: wp(4),
    color: "#414042",
    paddingHorizontal: wp(2),
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
