import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import { reminderSVG } from "../misc/loadSVG";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Progress from "react-native-progress";
import { useUserContext } from "../context/UserContext";
import { db, storage } from "../firebaseConfig";
import * as FileSystem from "expo-file-system";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const ReminderScreen = () => {
  const [progressValue, setProgressValue] = useState(0.8);
  const [fontLoaded, setFontLoaded] = useState(false);
  const { user } = useUserContext();

  const navigation = useNavigation();
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const handleImageUpload = async () => {
    try {
      const { uri } = await FileSystem.getInfoAsync(user.imageUri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const fileName = user.imageUri.substring(user.imageUri.lastIndexOf("/"));

      const ref = storage.ref().child(`users${fileName}`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      console.log(url);
      await db
        .collection("User")
        .doc(user.userName)
        .update({
          ...user,
          userLikedProfile: [],
          imageUri: url,
        });
      Toast.show({
        type: "success",
        text1: "Done Uploading Profile",
        visibilityTime: 3000,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "TabNavigator" }],
        })
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Please upload your profile screen",
        visibilityTime: 3000,
      });
    }
  };

  const saveDataToDatabase = () => {
    handleImageUpload();
  };

  // Todo: Make it so that when the user already agreed,
  // This window won't show again.
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Progress.Bar progress={progressValue} width={wp(90)} color="#FF6D00" />
      </View>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <SvgXml xml={reminderSVG} style={styles.logo} />
        </View>
        <Text style={styles.heading}>Before you swipe</Text>
        <Text style={styles.text}>
          Welcome! We’re excited to be a part of your learning.
        </Text>
        <Text style={styles.text}>
          Here, we treat everyone with kindness, respect, and professionalism,
          no matter their race, religion, ethnicity, and program.
        </Text>
        <Text style={styles.text}>
          In our mission to make an environment where everyone can learn, meet
          new people, and ultimately, gain new knowledge that they can apply to
          their lives, we ask you to adhere to these guidelines.
        </Text>
        <Text style={styles.text}>
          And remember: We’ve always got your back! For the sake of learning,
          Pixel Quest (Developers).
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => saveDataToDatabase()}
      >
        <Text style={styles.buttonText}>I agree</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#023E8A",
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  content: {
    marginTop: hp(2),
    flex: 1,
    width: wp(90),
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logo: {
    marginBottom: hp(0.2),
  },
  heading: {
    fontFamily: "lato-regular",
    fontSize: hp(3),
    color: "#FFFFFF",
    marginBottom: hp(3),
  },
  text: {
    fontFamily: "lato-light",
    fontSize: hp(2.5),
    color: "#FFFFFF",
    marginBottom: hp(2),
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#FF9E00",
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(10),
    borderRadius: wp(4),
    alignItems: "center",
    position: "absolute",
    bottom: hp(3),
    width: wp(60),
  },
  buttonText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
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
