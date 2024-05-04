import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  PanResponder,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const users = [
  { id: "1", uri: require("../assets/Romy.jpg") },
  { id: "2", uri: require("../assets/BI.jpg") },
  { id: "3", uri: require("../assets/Luna.jpg") },
  { id: "4", uri: require("../assets/Sarap.jpg") },
];

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const CardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();

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
              <Image style={styles.image} source={item.uri} />
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
              <Image style={styles.image} source={item.uri} />
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
