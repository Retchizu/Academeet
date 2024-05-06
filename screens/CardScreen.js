import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  PanResponder,
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

const users = [
  {
    id: "1",
    uri: require("../assets/Romy.jpg"),
    name: "Romy",
    program: "BSCS",
    interests: "Game Dev, Pixel Art, GDScript",
  },
  {
    id: "2",
    uri: require("../assets/BI.jpg"),
    name: "BI",
    program: "BSCS",
    interests: "Web Development, UI/UX Design",
  },
  {
    id: "3",
    uri: require("../assets/Luna.jpg"),
    name: "Luna",
    program: "BSCS",
    interests: "Machine Learning, Data Science",
  },
  {
    id: "4",
    uri: require("../assets/Sarap.jpg"),
    name: "Sarap",
    program: "BSCS",
    interests: "Mobile App Development, Flutter",
  },
  {
    id: "5",
    uri: require("../assets/Tita.jpg"),
    name: "Tita",
    program: "BSCS",
    interests: "Rich's",
  },
  {
    id: "6",
    uri: require("../assets/Tits.png"),
    name: "Tits",
    program: "BSCS",
    interests: "UGH",
  },
  {
    id: "7",
    uri: require("../assets/HartHurt.png"),
    name: "Fsh enjoyer",
    program: "IT",
    interests: "Pre, alam mo ba",
  },
];

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCards, setLikedCards] = useState([]);
  const [passedCards, setPassedCards] = useState([]);
  const position = new Animated.ValueXY();
  const [fontLoaded, setFontLoaded] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 100) {
        // Swipe to the right
        // If swiped to right, store the name of the user to the likedCards array
        setLikedCards([...likedCards, users[currentIndex].name]);
      } else if (gestureState.dx < -100) {
        // Swipe to the left
        // Vice versa
        setPassedCards([...passedCards, users[currentIndex].name]);
      }

      if (gestureState.dx > 100 || gestureState.dx < -100) {
        Animated.spring(position, {
          toValue: { x: screenWidth + 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
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
    return users
      .map((item, i) => {
        if (i < currentIndex) {
          return null;
        } else if (i === currentIndex) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              key={item.id}
              style={[styles.cardContainer, rotateAndTranslate]}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.uri} />
                <View style={styles.textContainer}>
                  <View style={styles.nameProgramContainer}>
                    <Text style={styles.userName}>{item.name}, </Text>
                    <Text style={styles.userProgram}>{item.program}</Text>
                  </View>
                  <Text style={styles.userDetails}>{item.interests}</Text>
                </View>
              </View>
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.id}
              style={[
                styles.cardContainer,
                {
                  opacity: nextCardOpacityChange,
                  transform: [{ scale: nextCardScaleChange }],
                },
              ]}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.uri} />
                <View style={styles.textContainer}>
                  <View style={styles.nameProgramContainer}>
                    <Text style={styles.userName}>{item.name}, </Text>
                    <Text style={styles.userProgram}>{item.program}</Text>
                  </View>
                  <Text style={styles.userDetails}>{item.interests}</Text>
                </View>
              </View>
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  useEffect(() => {
    console.log("Liked Cards: ", likedCards.join(", "));
  }, [likedCards]);

  useEffect(() => {
    console.log("Passed Cards: ", passedCards.join(", "));
  }, [passedCards]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSpacer} />
      <View style={styles.cardContainer}>{renderUsers()}</View>
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontFamily: "lato-regular",
    fontSize: hp(3.8),
    color: "black",
    marginBottom: hp(1),
    marginRight: wp(1),
  },
  userProgram: {
    fontFamily: "lato-regular",
    fontSize: wp(7),
    color: "black",
    marginBottom: hp(1),
  },
  userDetails: {
    fontFamily: "lato-light",
    fontSize: wp(4.5),
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
    top: hp(1),
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
});

export default CardScreen;
