import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import img1 from "../misc/Rompek.png";
import { useUserContext } from "../context/UserContext";
import { db, storage } from "../firebaseConfig";

const data = [
  {
    key: 1,
    name: "Romnoel Petracorta",
    program: "Computer Science",
    email: "Lychee@gmail.com",
    yearLevel: "Sophomore",
    gender: "Male",
    characteristics: ["Curious", "Creative", "Sociable", "Adaptable", "Nigger"],
    topicsInterestedIn: [
      "Java",
      "CyberSecurity",
      "Mobile Application",
      "Game Dev",
    ],
  },
];

const ProfileScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bioText, setBioText] = useState("");
  const [userBio, setUserBio] = useState("");
  const containerRef = useRef(null);
  const navigation = useNavigation();
  const defaultImage = require("../assets/default_profile_pic.jpg");

  const { user } = useUserContext();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const handleAddBio = () => {
    setShowModal(true);
  };

  const saveBio = () => {
    setUserBio(bioText); // Save the typed bio
    setBioText(""); // Clear the input field after saving
    setShowModal(false);
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.content}>
        <Image
          source={
            !user.imageUri || user.imageUri != null
              ? { uri: user.imageUri }
              : defaultImage
          }
          style={styles.profilePic}
        />
        <Text style={styles.nameText}>{user.fullName}</Text>
        <Text style={styles.infoText}>{user.userProgram}</Text>
        <TouchableOpacity onPress={handleAddBio}>
          <Text style={styles.addBio}>{userBio ? userBio : "Add Bio"}</Text>
        </TouchableOpacity>
        <View style={{ height: hp(80) }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.secondContainer}>
              <Text
                style={[
                  {
                    alignSelf: "flex-start",
                    marginBottom: hp(1),
                    fontSize: wp(4),
                    fontFamily: "lato-bold",
                    color: "#FFFFFF",
                  },
                ]}
              >
                Personal Information
              </Text>
              <View style={styles.personalInfoContainer}>
                <View style={styles.emailContainer}>
                  <Text style={[styles.infoText]}>Email:</Text>
                  <Text
                    style={[
                      styles.sectionText,
                      { flex: 2, textAlign: "right" },
                    ]}
                  >
                    {user.email}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={[styles.infoText]}>Year Level:</Text>
                  <Text
                    style={[
                      styles.sectionText,
                      { flex: 2, textAlign: "right" },
                    ]}
                  >
                    {user.yearLevel}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={[styles.infoText]}>Gender:</Text>
                  <Text
                    style={[
                      styles.sectionText,
                      { flex: 2, textAlign: "right" },
                    ]}
                  >
                    {user.userGender}
                  </Text>
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
                Miscallaneous
              </Text>
              <View style={styles.personalInfoContainer}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.infoText]}>Characteristics:</Text>
                  <Text
                    style={[
                      styles.sectionText,
                      { flex: 2, textAlign: "right" },
                    ]}
                  >
                    {user.selectedTrait.join(", ")}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={[styles.infoText]}>Interests:</Text>
                  <Text
                    style={[
                      styles.sectionText,
                      { flex: 2, textAlign: "right" },
                    ]}
                  >
                    {user.userTopic.join(", ")}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.bioInput}
              multiline
              placeholder="Type your bio here..."
              value={bioText}
              onChangeText={(text) => setBioText(text)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveBio}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023E8A",
  },
  content: {
    marginBottom: hp(15), // Reduced marginBottom
    alignItems: "center",
  },
  nameText: {
    fontFamily: "lato-bold",
    fontSize: wp(6),
    color: "#FFFFFF",
    textAlign: "center",
  },
  infoText: {
    fontFamily: "lato-regular",
    fontSize: wp(4),
    color: "#FFFFFF",
    textAlign: "left",
    marginTop: hp(1),
  },
  sectionText: {
    fontFamily: "lato-bold",
    fontSize: wp(3),
    color: "#FFFFFF",
    marginTop: hp(1),
    textAlign: "left",
    marginLeft: wp(5), // Align text to the left
  },
  profilePic: {
    borderRadius: wp(5),
    marginBottom: hp(2),
    marginTop: hp(3),
    width: wp(40), // Adjust image width as needed
    height: wp(40), // Adjust image height as needed
  },
  addBio: {
    fontFamily: "lato-regular",
    fontSize: wp(3),
    color: "#FFFFFF",
    marginTop: hp(2), // Moved closer to the Personal Information
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: wp(5),
    borderRadius: wp(2),
    width: wp(80),
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
    marginTop: hp(1), // Moved closer to the Add Bio button
    width: wp(80),
    backgroundColor: "#0077B6",
    borderRadius: hp(2),
    borderWidth: wp(0.3),
    borderColor: "#0077B6",
    padding: wp(3),
  },
  secondContainer: {
    marginTop: hp(5),
  },
  emailContainer: {
    flexDirection: "row", // Arrange children horizontally
    justifyContent: "space-between", // Align children to the start and end of the container
    alignItems: "center", // Align children vertically
    borderBottomWidth: 0.5, // Add a thin line at the bottom
    borderBottomColor: "#FFFFFF", // Set the color of the line
    paddingBottom: hp(1), // Add padding to improve visual appearance
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
});
