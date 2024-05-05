import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Image } from "react-native";
import { loadFont } from "../misc/loadFont";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import img1 from "../misc/Rompek.png";

const ProfileScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [bioText, setBioText] = useState("");
  const [userBio, setUserBio] = useState("");

  const [progressValue, setProgressValue] = useState(0.2);
  const programs = [
    "Computer Science",
    "Information Technology",
    "Information System",
    "Multimedia Arts",
  ];
  programs.sort();


  const containerRef = useRef(null);
  const navigation = useNavigation();
  const [bio, setBio] = useState("");

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
        <Image source={img1} style={styles.profilePic} />
        <Text style={styles.nameText}>Romnoel Petracorta</Text>
        <Text style={styles.infoText}>BS Computer Science</Text>
      </View>

      <TouchableOpacity onPress={handleAddBio} style={styles.addBioContainer}>
        {userBio ? (
          <Text style={styles.userBio}>{userBio}</Text>
        ) : (
          <Text style={styles.addBio}>Add Bio</Text>
        )}
      </TouchableOpacity>

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

      <View style={styles.personalInfoContainer}>
        <Text style={styles.sectionText}>Personal Information</Text>
        <Text style={styles.sectionText}>Email</Text>
        <Text style={styles.sectionText}>Personal Traits</Text>
        <Text style={styles.sectionText}>Topics Interested in</Text>
      </View>
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
    alignItems: "center", 
    marginBottom: hp(2),
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
    textAlign: "center",
    marginTop: hp(1),
  },
  sectionText: {
    fontFamily: "lato-bold",
    fontSize: wp(5),
    color: "#FFFFFF",
    marginTop: hp(3),
  },
  profilePic: {
    marginBottom: hp(1),
    width: wp(40), // Adjust image width as needed
    height: wp(40), // Adjust image height as needed
  },
  addBioContainer: {
    marginTop: hp(2),
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  addBio: {
    fontFamily: "lato-regular",
    fontSize: wp(4),
    color: "#FFFFFF",
    textDecorationLine: "underline",
  },
  userBio: {
    fontFamily: "lato-regular",
    fontSize: wp(4),
    color: "#FFFFFF",
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
});
