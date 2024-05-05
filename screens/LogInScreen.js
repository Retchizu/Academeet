import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { loadFont } from "../misc/loadFont";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGLogo } from "../misc/loadSVG";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const LogInScreen = () => {
  const navigation = useNavigation();

  const [fontLoaded, setFontLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
        <View style={styles.centerView}>
          <SvgXml xml={SVGLogo} />
          <Text style={styles.logoText}>academeet</Text>
        </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Username"
          placeholderTextColor="#6D6D6D"
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor="#6D6D6D"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconContainer}
          >
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={24}
              color="#6D6D6D"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: hp(22),
                  }}
                >
                  <Text style={styles.registerText}>
                    Don't have an account yet?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("RegisterScreen")}
                  >
                    <Text style={styles.registerLink}>Register here</Text>
                  </TouchableOpacity>
                </View>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  inputField: {
    fontFamily: "lato-light",
    width: wp(65),
    height: hp(6),
    borderWidth: wp(0.3),
    borderColor: "#414042",
    borderRadius: wp(5),
    marginTop: hp(3),
    marginHorizontal: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: "#FFFFFF",
    fontSize: wp(4),
  },
  textInputContainer: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#414042",
    alignSelf: "center",
    padding: hp(2),
    marginBottom: hp(2),
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIconContainer: {
    position: "absolute",
    right: wp(7),
    top: hp(4.5),
  },
  logoText: {
    fontFamily: "lato-bold",
    fontSize: wp(8),
    color: "#FF9E00",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023E8A",
    flex: 1,
  },

  button: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(6),
    borderRadius: wp(4),
    marginRight: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: wp(30),
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#FF9E00",
  },
  buttonText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
  },
  registerContainer: {
    position: "absolute",
    marginBottom: hp(1),
    flexDirection: "row",
    alignItems: "center", 
  },
  registerText: {
    fontFamily: "lato-light",
    fontSize: wp(3.5),
    color: "#FFFFFF",
  },
  registerLink: {
    fontFamily: "lato-regular",
    fontSize: wp(3.5),
    color: "#FFFFFF",

  },
  centerView: {
    justifyContent: "center",
    alignItems: "center",
  },
  
});
