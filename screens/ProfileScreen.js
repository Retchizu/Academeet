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
  Dimensions,
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
import { SvgXml } from "react-native-svg";
import { SVGLogo, pendingSVG, settingSVG } from "../misc/loadSVG";

// Function to load font and set fontLoaded state
const ProfileScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bioText, setBioText] = useState("");
  const containerRef = useRef(null);
  const navigation = useNavigation();
  const defaultImage = require("../assets/default_profile_pic.jpg");
  const { putAttribute, user } = useUserContext();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const handleAddBio = () => {
    setShowModal(true);
  };

  const saveBio = async () => {
    putAttribute("userBio", bioText);
    await db.collection("User").doc(user.userName).update({
      userBio: bioText,
    });
    setBioText(""); 
    setShowModal(false);
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.header}>
        <TouchableOpacity
          // TODO: Onclick baws
          onPress={() => {
            console.log("clicked pending ");
          }}
        >
          <SvgXml xml={pendingSVG} style={styles.svgIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>academeet</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("Clicked settings");
          }}
        >
          <SvgXml xml={settingSVG} style={styles.svgIcon} />
        </TouchableOpacity>
      </View>
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
          <Text style={styles.addBio}>
            {user.userBio ? user.userBio : "Add Bio"}
          </Text>
        </TouchableOpacity>

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
                style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
              >
                {user.email}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.infoText]}>Year Level:</Text>
              <Text
                style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
              >
                {user.yearLevel}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.infoText]}>Gender:</Text>
              <Text
                style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
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
            Miscellaneous
          </Text>
          <View style={styles.personalInfoContainer}>
            <View style={styles.infoContainer}>
              <Text style={[styles.infoText]}>Characteristics:</Text>
              <Text
                style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
              >
                {user.selectedTrait.join(", ")}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.infoText]}>Interests:</Text>
              <Text
                style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
              >
                {user.userTopic.join(", ")}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
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
    fontSize: hp(2),
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
    marginTop: hp(1),
    width: wp(80),
    backgroundColor: "#0077B6",
    borderRadius: hp(2),
    borderWidth: hp(0.1),
    borderColor: "#0077B6",
    padding: hp(2),
  },
  secondContainer: {
    marginTop: hp(2),
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
});
