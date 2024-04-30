import * as Font from "expo-font";

const loadFont = async () => {
  return await Font.loadAsync({
    "lato-regular": require("../fonts/Lato-Regular.ttf"),
    "lato-bold": require("../fonts/Lato-Bold.ttf"),
    "lato-black": require("../fonts/Lato-Black.ttf"),
    "lato-light": require("../fonts/Lato-Light.ttf"),
    "lato-thin": require("../fonts/Lato-Thin.ttf"),
  });
};

export { loadFont };
