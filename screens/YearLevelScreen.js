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
import { useUserContext } from "../context/UserContext";

const YearLevelScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [progressValue, setProgressValue] = useState(0.1);
  const year = [
    { key: 1, label: "Freshman" },
    { key: 2, label: "Sophomore" },
    { key: 3, label: "Junior" },
    { key: 4, label: "Senior" },
  ];
  year.sort();

  const { putAttribute, user, removeAttribute } = useUserContext();

  console.log(user);

  const containerRef = useRef(null);
  const navigation = useNavigation();

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

  const handleSelectYear = (year) => {
    setSelectedYear(year.label);
    setShowModal(false);
  };

  const handlePress = () => {
    setShowModal(true);
  };

  const goToNextScreen = () => {
    if (!selectedYear.trim()) {
      console.log("Please select your year");
      return;
    }
    putAttribute("yearLevel", selectedYear);
    navigation.navigate("ProgramScreen"); //pakiayos ng program screen
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
      <TouchableOpacity style={styles.pickerContainer} onPress={handlePress}>
        <View style={styles.pickerContent}>
          <Text style={styles.inputField}>
            {selectedYear || "Select your year level"}
          </Text>
          <SvgXml xml={dropDown} width={wp(4)} height={wp(4)} />
        </View>
      </TouchableOpacity>
      <Modal visible={showModal} transparent={true} animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.dropdownModal}>
            <FlatList
              data={year}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelectYear(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    height: hp(5),
    position: "relative",
    zIndex: 1,
  },
  pickerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: hp(2),
    borderWidth: wp(0.3),
    borderColor: "#CCCCCC",
    paddingHorizontal: wp(2),
  },
  inputField: {
    color: "#414042",
    fontFamily: "lato-regular",
    fontSize: wp(4),
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownModal: {
    position: "absolute",
    left: wp(15),
    top: hp(46),
    width: wp(70),
    maxHeight: hp(30),
    backgroundColor: "#FFFFFF",
    borderRadius: hp(2),
    borderWidth: wp(0.3),
    borderColor: "#CCCCCC",
    zIndex: 2,
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  optionText: {
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
