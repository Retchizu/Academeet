import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const GenderButton = ({ label, selectedGender, onPress }) => {
  return (
    <View style={styles.button}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => onPress(label)}>
        <View
          style={[
            styles.genderIndicator,
            { backgroundColor: selectedGender === label ? "#FF9E00" : "white" },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GenderButton;

const styles = StyleSheet.create({
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
});
