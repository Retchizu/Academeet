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
      console.log("onPanResponderMove called");
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: () => {},
  });

  const renderUsers = () => {
    return users.reverse().map((item, i) => {
      if (i < currentIndex) {
        return null;
      } else if (i === currentIndex) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
            style={{
              transform: position.getTranslateTransform(),
              height: screenHeight - hp(10),
              width: screenWidth,
              padding: wp(5),
              position: "absolute",
            }}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: wp(8),
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={{
              height: screenHeight - hp(10),
              width: screenWidth,
              padding: wp(5),
              position: "absolute",
            }}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: wp(8),
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      }
    });
  };

  return (
    <View style={{ backgroundColor: "#023E8A", flex: 1 }}>
      <View style={{ height: hp(5) }}></View>
      <View style={{ flex: 1 }}>
        {renderUsers()}
        <Text style={styles.currentIndexText}>
          Current Index: {currentIndex}, i: {users[currentIndex].id}
        </Text>
      </View>
      <View style={{ height: hp(5) }}></View>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  currentIndexText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
