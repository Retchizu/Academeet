import { StyleSheet, View } from "react-native";
import React from "react";
import {
  Canvas,
  Fill,
  Image,
  BackdropBlur,
  ColorMatrix,
  useImage,
  Blur,
} from "@shopify/react-native-skia";
import { SVGLogo } from "../misc/loadSVG";
import { Text, useFont } from "@shopify/react-native-skia";

const TestScreen = () => {
  const fontSize = 32;
  const font = useFont(require("../fonts/Lato-Regular.ttf"), fontSize);
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="white" />
      <Text x={0} y={fontSize} text="Hello World" font={font} />
      <Blur blur={6} />
    </Canvas>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
