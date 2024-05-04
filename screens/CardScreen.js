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
];

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [fontLoaded, setFontLoaded] = useState(false);
  

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
        Animated.spring(position, {
          toValue: { x: screenWidth + 100, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gestureState.dx < -100) {
        Animated.spring(position, {
          toValue: { x: -screenWidth - 100, y: gestureState.dy },
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

  return (
    <View style={styles.container}>
      <View style={styles.topSpacer} />
      <View style={styles.cardContainer}>{renderUsers()}</View>
      <View style={styles.bottomSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontFamily: "lato-regular",
    fontSize: wp(7),
    color: "black",
    marginBottom: hp(1),
    marginRight: wp(1)
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
  informationContainer: {
    paddingLeft: wp(5),
    flexDirection: "row",
    backgroundColor: "red",
    bottom: hp(10),
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: wp(8),
    overflow: "hidden",
    paddingTop: hp(2),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    paddingBottom: hp(4),
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
    height: screenHeight - hp(10),
    width: screenWidth,
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
