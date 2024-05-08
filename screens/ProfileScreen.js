import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../context/UserContext";
import { db, storage } from "../firebaseConfig";
import { SvgXml } from "react-native-svg";
import { SVGprevious, reminderSVG } from "../misc/loadSVG";
import { SVGLogo, pendingSVG, settingSVG } from "../misc/loadSVG";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bioText, setBioText] = useState("");
  const containerRef = useRef(null);
  const navigation = useNavigation();
  const defaultImage = require("../assets/default_profile_pic.jpg");
  const { putAttribute, user } = useUserContext();
  const [showTraitModal, setShowTraitModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const handleAddBio = () => {
    setShowModal(true);
  };

  const handleViewTraits = () => {
    setShowTraitModal(true);
  };

  const handleViewTopics = () => {
    setShowTopicModal(true);
  };

  const saveBio = async () => {
    putAttribute("userBio", bioText);
    await db.collection("User").doc(user.userName).update({
      userBio: bioText,
    });
    setBioText("");
    setShowModal(false);
  };

  const toggleTrait = async (trait) => {
    const isTraitSelected = user.selectedTrait.includes(trait);

    if (isTraitSelected && user.selectedTrait.length === 1) {
      putAttribute("selectedTrait", []);
    } else if (
      (isTraitSelected && user.selectedTrait.length > 1) ||
      (!isTraitSelected && user.selectedTrait.length < 5)
    ) {
      const updatedTraits = isTraitSelected
        ? user.selectedTrait.filter((item) => item !== trait)
        : [...user.selectedTrait, trait];

      putAttribute("selectedTrait", updatedTraits);
    }
  };

  const toggleTopic = async (topic) => {
    const isTopicSelected = user.userTopic.includes(topic);

    if (isTopicSelected && user.userTopic.length === 1) {
      putAttribute("userTopic", []);
    } else if (
      (isTopicSelected && user.userTopic.length > 1) ||
      (!isTopicSelected && user.userTopic.length < 5)
    ) {
      const updatedTopics = isTopicSelected
        ? user.userTopic.filter((item) => item !== topic)
        : [...user.userTopic, topic];

      putAttribute("userTopic", updatedTopics);
    }
  };

  const personalityTraits = [
    { key: 1, label: "Curious" },
    { key: 2, label: "Creative" },
    { key: 3, label: "Confident" },
    { key: 4, label: "Empathetic" },
    { key: 5, label: "Organized" },
    { key: 6, label: "Adventurous" },
    { key: 7, label: "Analytical" },
    { key: 8, label: "Ambitious" },
    { key: 9, label: "Diligent" },
    { key: 10, label: "Adaptable" },
    { key: 11, label: "Detail-oriented" },
    { key: 12, label: "Motivated" },
    { key: 13, label: "Patient" },
    { key: 14, label: "Optimistic" },
    { key: 15, label: "Collaborative" },
    { key: 16, label: "Resilient" },
    { key: 17, label: "Independent" },
    { key: 18, label: "Friendly" },
    { key: 19, label: "Energetic" },
    { key: 20, label: "Calm" },
    { key: 21, label: "Communicative" },
    { key: 22, label: "Perseverant" },
    { key: 23, label: "Innovative" },
    { key: 24, label: "Punctual" },
    { key: 25, label: "Responsible" },
    { key: 26, label: "Flexible" },
    { key: 27, label: "Proactive" },
    { key: 28, label: "Resourceful" },
  ];

  const topicsLanguage = [
    { key: 1, label: "Java" },
    { key: 2, label: "Python" },
    { key: 3, label: "C++" },
    { key: 4, label: "JavaScript" },
    { key: 5, label: "Ruby" },
    { key: 6, label: "Swift" },
    { key: 7, label: "Artificial Intelligence" },
    { key: 8, label: "Data Science" },
    { key: 9, label: "Machine Learning" },
    { key: 10, label: "Cybersecurity" },
    { key: 11, label: "Web Development" },
    { key: 12, label: "Mobile App Development" },
    { key: 13, label: "Blockchain" },
    { key: 14, label: "Internet of Things" },
    { key: 15, label: "Cloud Computing" },
    { key: 16, label: "Augmented Reality/ Virtual Reality" },
    { key: 17, label: "Quantum Computing" },
    { key: 18, label: "Agile Methodology" },
    { key: 19, label: "DevOps" },
    { key: 20, label: "Software Testing" },
    { key: 21, label: "Software Architecture" },
    { key: 22, label: "Finance & Technology" },
    { key: 23, label: "Healthcare & Technology" },
    { key: 24, label: "Gaming & Technology" },
    { key: 25, label: "Education Technology" },
    { key: 26, label: "E-commerce & Technology" },
  ];

  personalityTraits.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <View style={styles.container} ref={containerRef}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PendingScreen");
          }}
        >
          <SvgXml xml={pendingSVG} style={styles.svgIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>academeet</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SettingScreen");
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
          <Text style={styles.headingText}>Personal Information</Text>
          <View style={styles.personalInfoContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Email:</Text>
              <Text style={styles.sectionText}>{user.email}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Year Level:</Text>
              <Text style={styles.sectionText}>{user.yearLevel}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Gender:</Text>
              <Text style={styles.sectionText}>{user.userGender}</Text>
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
            <TouchableOpacity onPress={handleViewTraits}>
              <View style={styles.infoContainer}>
                <Text style={[styles.infoText]}>Characteristics:</Text>
                <Text
                  style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
                >
                  {user.selectedTrait.join(", ")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleViewTopics}>
              <View style={styles.infoContainer}>
                <Text style={[styles.infoText]}>Interests:</Text>
                <Text
                  style={[styles.sectionText, { flex: 2, textAlign: "right" }]}
                >
                  {user.userTopic.join(", ")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bio Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
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
        </View>
      </Modal>

      {/* Trait Modal */}
      <Modal
        visible={showTraitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTraitModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalTraitContainer}>
            <View style={styles.modalTraitContent}>
              {personalityTraits.map((trait) => (
                <TouchableOpacity
                  key={trait.key}
                  style={[
                    styles.traitButton,
                    user.selectedTrait.includes(trait.label) &&
                      styles.traitSelected,
                  ]}
                  onPress={() => toggleTrait(trait.label)}
                >
                  <Text
                    style={[
                      styles.traitText,
                      user.selectedTrait.includes(trait.label) &&
                        styles.highlightedTrait,
                    ]}
                  >
                    {trait.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={async () => {
                  try {
                    await db.collection("User").doc(user.userName).update({
                      selectedTrait: user.selectedTrait,
                    });
                    Toast.show({
                      type: "success",
                      text1: "Updated successfully",
                    });
                  } catch (error) {
                    Toast.show({
                      type: "error",
                      text1: "Error updating, try again later",
                      text2: error.message,
                    });
                  }

                  setShowTraitModal(false);
                }}
              >
                <Text style={styles.closeButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Topic Modal */}
      <Modal
        visible={showTopicModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTopicModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalTraitContainer}>
            <View style={styles.modalTraitContent}>
              {topicsLanguage.map((topic) => (
                <TouchableOpacity
                  key={topic.key}
                  style={[
                    styles.traitButton,
                    user.userTopic.includes(topic.label) &&
                      styles.traitSelected,
                  ]}
                  onPress={() => toggleTopic(topic.label)}
                >
                  <Text
                    style={[
                      styles.traitText,
                      user.userTopic.includes(topic.label) &&
                        styles.highlightedTrait,
                    ]}
                  >
                    {topic.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={async () => {
                  try {
                    await db.collection("User").doc(user.userName).update({
                      userTopic: user.userTopic,
                    });
                    Toast.show({
                      type: "success",
                      text1: "Updated successfully",
                    });
                  } catch (error) {
                    Toast.show({
                      type: "error",
                      text1: "Error updating, try again later",
                      text2: error.message,
                    });
                  }
                  setShowTopicModal(false);
                }}
              >
                <Text style={styles.closeButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#FF9E00",
    paddingVertical: hp(1.1),
    padding: wp(3),
    borderRadius: wp(5),
    alignItems: "center",
    position: "absolute",
    bottom: hp(0.5),
    width: wp(18),
    marginLeft: wp(53),
  },
});
