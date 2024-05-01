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

const AddPhotoScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const containerRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setShowModal(false);
  };

  const handlePress = () => {
    setShowModal(true);
  };

  const goToNextScreen = () => {
    navigation.navigate("NextScreen");
  };

  const goToPreviousScreen = () => {
    navigation.navigate("PreviousScreen");
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>Add your first photo!</Text>
        <Text style={styles.description}>
          This is something to make you known for other students like you. Of
          course, you can definitely change it later.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={goToNextScreen}
      >
        <SvgXml xml={SVGnext} width={45} height={45} style={styles.nextIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.previousIconContainer}
        onPress={() => navigation.navigate("ProgramScreen")}
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

export default AddPhotoScreen;

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
});
