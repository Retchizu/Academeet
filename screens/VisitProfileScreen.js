import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import { pendingSVG, SVGprevious } from "../misc/loadSVG";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CommonActions, useNavigation } from "@react-navigation/native";
{/* <Text>{param.user.fullName}</Text> */}



const VisitProfileScreen = ({ route }) => {
  const param = route.params; // do not delete
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  console.log("ong", param); // ""
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.svgContainer}>
          <SvgXml
            xml={SVGprevious}
            width={45}
            height={45}
            style={styles.previousIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>academeet</Text>
      </View>
      <View style={styles.content}>
        <View style={{paddingTop: hp(3)}}>
          <Image
            source={
              !param.user.imageUri || param.user.imageUri != null
                ? { uri: param.user.imageUri }
                : defaultImage
            }
            style={styles.profilePic}
          />
        </View>
        
        <Text style={styles.nameText}>{param.user.fullName}</Text>
        <Text style={styles.infoText}>{param.user.userProgram}</Text>
        <Text style={styles.infoText}>{param.user.userBio}</Text>


        <View style={styles.secondContainer}>
          <Text style={styles.headingText}>Personal Information</Text>
          <View style={styles.personalInfoContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Username:</Text>
              <Text style={styles.sectionText}>{param.user.userName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Year Level:</Text>
              <Text style={styles.sectionText}>{param.user.yearLevel}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Gender:</Text>
              <Text style={styles.sectionText}>{param.user.userGender}</Text>
            </View>
          </View>
          <Text
            style={[
              {
                alignSelf: "flex-start",
                fontSize: wp(4),
                fontFamily: "lato-bold",
                color: "#FFFFFF",
                marginTop: wp(4),
              },
            ]}
          >
            Miscellaneous
          </Text>
          <View style={styles.personalInfoContainer}>
              <View style={styles.infoContainer}>
                <Text style={[styles.infoText]}>Characteristics:</Text>
                <Text
                  style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
                >
                  {param.user.selectedTrait.join(", ")}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={[styles.infoText]}>Interests:</Text>
                <Text
                  style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
                >
                  {param.user.userTopic.join(", ")}
                </Text>
              </View>

          </View>
        </View>

      </View>

</View>
  );
};

export default VisitProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    backgroundColor: "#023E8A",
  },
  headerTitle: {
    fontFamily: "lato-regular",
    fontSize: hp(3),
    color: "#FF9E00",
  },
  svgIcon: {
    width: hp(7),
    height: hp(7),
  },
  content: {
    flex: 1,
    marginBottom: hp(15),
    alignItems: "center",
  },
  nameText: {
    fontFamily: "lato-bold",
    fontSize: hp(3),
    color: "#FFFFFF",
    textAlign: "center",
  },
  infoText: {
    fontFamily: "lato-regular",
    fontSize: hp(1.9),
    color: "#FFFFFF",
    textAlign: "left",
    marginTop: hp(1),
  },
  sectionText: {
    fontFamily: "lato-bold",
    fontSize: hp(1.5),
    color: "#FFFFFF",
    marginTop: hp(1),
    textAlign: "left",
    marginLeft: wp(5),
  },
  profilePic: {
    borderRadius: hp(4),
    marginBottom: hp(1),
    marginTop: hp(1),
    width: hp(18),
    height: hp(18),
  },
  addBio: {
    fontFamily: "lato-regular",
    fontSize: hp(1.8),
    color: "#FFFFFF",
    marginTop: hp(2),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#0077B6",
    padding: wp(5),
    borderRadius: wp(2),
    width: wp(80),
  },
  modalContent: {
    backgroundColor: "#0077B6",
    padding: wp(5),
    borderRadius: wp(4),
    width: wp(70),
    maxHeight: hp(70),
  },
  bioInput: {
    fontFamily: "lato-regular",
    fontSize: wp(4),
    color: "#000000",
    textAlignVertical: "top",
    minHeight: hp(20),
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: wp(2),
    padding: wp(2),
    marginBottom: hp(2),
  },
  saveButton: {
    backgroundColor: "#023E8A",
    padding: wp(3),
    borderRadius: wp(2),
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: "lato-bold",
    fontSize: wp(4),
    color: "#FFFFFF",
  },
  personalInfoContainer: {
    marginTop: hp(1),
    width: wp(80),
    backgroundColor: "#0077B6",
    borderRadius: hp(2),
    borderWidth: hp(0.1),
    borderColor: "#0077B6",
    padding: hp(2),
    paddingTop: hp(0.1),
  },
  secondContainer: {
    marginTop: hp(1),
  },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#FFFFFF",
    paddingBottom: hp(1),
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(1),
    borderBottomWidth: 0.5,
    borderBottomColor: "#FFFFFF",
    paddingBottom: hp(1),
  },
  headingText: {
    alignSelf: "flex-start",
    marginBottom: hp(1),
    fontSize: wp(4),
    fontFamily: "lato-bold",
    color: "#FFFFFF",
  },

  traitSelected: {
    backgroundColor: "#FF6D00",
  },
  traitText: {
    fontFamily: "lato-regular",
    fontSize: wp(3),
  },
  highlightedTrait: {
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    backgroundColor: "#FF6D00",
  },
  modalTraitContainer: {
    backgroundColor: "#0077B6",
    padding: wp(5),
    borderRadius: wp(2),
    width: wp(80),
  },
  modalTraitContent: {
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

  closeButtonText: {
    fontFamily: "lato-regular",
    fontSize: wp(3),
    color: "#FFFFFF",
  },
  closeButton: {
    paddingVertical: hp(1.1),
    padding: wp(3),
    borderRadius: wp(5),
    alignItems: "center",
    position: "absolute",
    bottom: hp(0.5),
    width: wp(18),
    marginLeft: wp(53),
  },
  headerText: {
    fontSize: wp(8),
    fontFamily: "lato-bold",
    color: "#FF9E00",
    paddingLeft: wp(11),
    paddingBottom: hp(3),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(5),
    paddingHorizontal: hp(1),
  },
  previousIcon: {
    marginLeft: wp(2),
    marginRight: wp(5),
    marginBottom: hp(2),
  },
});
