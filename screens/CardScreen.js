import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { loadFont } from "../misc/loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { pendingSVG, settingSVG } from "../misc/loadSVG";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { useAcademeetUserContext } from "../context/AcademeetUserContext";
import { useUserContext } from "../context/UserContext";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCards, setLikedCards] = useState([]);
  const [passedCards, setPassedCards] = useState([]);
  const position = new Animated.ValueXY();
  const [fontLoaded, setFontLoaded] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { setAcademeetUsersList } = useAcademeetUserContext();
  const [imagesLoaded, setImagesLoaded] = useState(false); // State to track if images are loaded
  const { user, putAttribute } = useUserContext();
  const [userCards, setUserCards] = useState([]);

  const fetchUserFromDatabase = async () => {
    const docRef = db.collection("User");

    try {
      const docs = await docRef.get();
      const fetchingList = [];
      docs.forEach((doc) => {
        if (doc.data().userName !== user.userName) {
          fetchingList.push(doc.data());
        }
      });
      setAcademeetUsersList(fetchingList);
      setUserCards(fetchingList);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUserFromDatabase();
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      const currentObject = userCards[currentIndex];
      if (!currentObject) {
        // Skip the card if it was null
        return;
      }
      const currentObjectUserName = currentObject.userName;
      if (gestureState.dx > 100) {
        // Swipe to the right
        // If swiped to right, store the id of the user to the likedCards array
        const isExisting = likedCards.find(
          (item) => item.userName === currentObjectUserName
        );
        if (!isExisting) {
          setLikedCards([...likedCards, currentObject]);
        } else {
          setLikedCards(
            likedCards.filter((item) => item.userName !== currentObjectUserName)
          );
        }
        // Remove the card from the users array
        const currentObjectIndex = userCards.findIndex(
          (item) => item.userName === currentObjectUserName
        );
        const updatedUsers = [...userCards];
        updatedUsers.splice(currentObjectIndex, 1);
        setUserCards(updatedUsers);
        // Update the current index to render the next user
        setCurrentIndex((currentIndex + 1) % updatedUsers.length);
      } else if (gestureState.dx < -100) {
        // Swipe to the left
        // Vice versa
        const isExisting = passedCards.find(
          (item) => item.userName === currentObjectUserName
        );
        if (!isExisting) {
          setPassedCards([...passedCards, currentObject]);
          // Loop back to the beginning if swiped left
          setCurrentIndex((currentIndex + 1) % userCards.length);
        } else {
          const temp = [...passedCards];
          temp.shift();
          temp.splice(userCards.length - 1, 0, currentObject);
          setPassedCards(temp);
          setCurrentIndex((currentIndex + 1) % userCards.length);
        }
      }

      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        friction: 4,
        useNativeDriver: true,
      }).start();
    },
  });

  const rotate = position.x.interpolate({
    inputRange: [-screenHeight / 2, 0, screenWidth / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  const nextCardOpacityChange = position.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });

  const nextCardScaleChange = position.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  const renderUsers = () => {
    return userCards.map((item, i) => {
      if (i === currentIndex) {
        const userNameFontSize = item.fullName.length > 20 ? hp(2.5) : hp(3);
        const userDetailsFontSize =
          item.userTopic.length > 50 ? hp(1.8) : hp(2);

        // Join user topics with commas
        const userTopics = item.userTopic.join(", ");

        return (
          <Animated.View
            key={item.userName}
            style={[styles.cardContainer, rotateAndTranslate]}
          >
            <View style={styles.cardContent} {...panResponder.panHandlers}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: item.imageUri }}
                  onLoadEnd={() => setImagesLoaded(true)}
                />
                {!imagesLoaded && (
                  <ActivityIndicator
                    size="large"
                    color="#0077B6"
                    style={styles.loadingIndicator}
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.userName, { fontSize: userNameFontSize }]}>
                  {item.fullName}
                </Text>
                <Text
                  style={[
                    styles.userProgram,
                    { fontSize: userDetailsFontSize },
                  ]}
                >
                  {item.userProgram}
                </Text>
                <Text
                  style={[
                    styles.userDetails,
                    { fontSize: userDetailsFontSize },
                  ]}
                >
                  {userTopics}
                </Text>
              </View>
            </View>
          </Animated.View>
        );
      } else {
        console.log("i in else", i);
        return null;
      }
    });
  };

  useEffect(() => {
    const likedCardsToDatabase = async () => {
      try {
        if (likedCards.length) {
          await db.collection("User").doc(user.userName).update({
            userLikedProfile: likedCards,
          });

          putAttribute("userLikedProfile", likedCards);
          console.log("done updating");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (likedCards.length) {
      likedCardsToDatabase();
    }
  }, [likedCards]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("PendingScreen")}>
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
      <View></View>
      <View style={styles.topSpacer} />
      <View style={styles.cardContainer}>
        {userCards.length ? (
          renderUsers()
        ) : (
          <View style={styles.centeredContainer}>
            <View style={styles.centeredTextContainer}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "lato-regular",
                  fontSize: hp(2),
                }}
              >
                No more users to show
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredTextContainer: {
    elevation: 4,
    backgroundColor: "#0077B6",
    padding: hp(6),
    borderRadius: hp(4),
  },
  centeredText: {
    color: "white",
    fontSize: hp(2),
  },
  cardContent: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: wp(8),
    overflow: "hidden",
    paddingLeft: hp(2),
    paddingRight: hp(2),
    paddingBottom: hp(4),
    marginBottom: hp(2),
  },
  userName: {
    fontFamily: "lato-regular",
    fontSize: hp(3),
    color: "black",
    marginBottom: hp(1),
    marginRight: wp(1),
  },
  userProgram: {
    fontFamily: "lato-regular",
    fontSize: hp(3),
    color: "black",
    marginBottom: hp(1),
  },
  userDetails: {
    fontFamily: "lato-light",
    fontSize: hp(2),
    color: "black",
  },
  textContainer: {
    paddingTop: hp(2),
  },
  nameProgramContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: wp(8),
    overflow: "hidden",
    paddingTop: hp(2),
    paddingLeft: hp(2),
    paddingRight: hp(2),
    paddingBottom: hp(4),
    marginBottom: hp(2),
    position: "relative", // Added position relative for proper positioning of loading indicator
  },
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
  },
  topSpacer: {
    height: hp(5),
  },
  bottomSpacer: {
    height: hp(5),
  },
  cardContainer: {
    flex: 1,
    padding: wp(5),
    position: "absolute",
    top: hp(3),
    bottom: hp(5),
    left: 0,
    right: 0,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: wp(8),
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
  loadingIndicator: {
    position: "absolute",
    top: "50%", // Center loading indicator vertically
    left: "50%", // Center loading indicator horizontally
  },
});

export default CardScreen;
