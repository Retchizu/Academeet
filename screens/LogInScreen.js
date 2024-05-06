import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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
import { auth, db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../context/UserContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logInCredential, setLogInCredential] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserContext();
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const handleOnChangeTextLogIn = (property, value) => {
    setLogInCredential({ ...logInCredential, [property]: value });
  };

  console.log(logInCredential.userName, logInCredential.password);

  const logInUser = async () => {
    if (logInCredential.userName && logInCredential.password) {
      try {
        setLoading(true);
        const docRef = await db
          .collection("User")
          .doc(logInCredential.userName)
          .get();
        const userEmail = docRef.data();
        await auth.signInWithEmailAndPassword(
          userEmail.email,
          logInCredential.password
        );
        await AsyncStorage.setItem("email", userEmail.email);
        await AsyncStorage.setItem("password", logInCredential.password);
        const data = await db
          .collection("User")
          .doc(logInCredential.userName)
          .get();
        if (data.exists) {
          const {
            email,
            fullName,
            selectedTrait,
            userGender,
            userName,
            userProgram,
            userTopic,
            yearLevel,
          } = data.data();
          if (
            email &&
            fullName &&
            selectedTrait &&
            userGender &&
            userName &&
            userProgram &&
            userTopic &&
            yearLevel
          ) {
            setUser(data.data());
            navigation.replace("TabNavigator");
          } else {
            navigation.replace("NameScreen");
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SvgXml xml={SVGLogo} />
      <Text style={styles.logoText}>academeet</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          value={logInCredential.userName}
          style={styles.inputField}
          placeholder="Username"
          placeholderTextColor="#6D6D6D"
          onChangeText={(text) => handleOnChangeTextLogIn("userName", text)}
        />

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            placeholderTextColor="#6D6D6D"
            secureTextEntry={!showPassword}
            value={logInCredential.password}
            onChangeText={(text) => handleOnChangeTextLogIn("password", text)}
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
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => logInUser()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.registerLink}>Register here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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

  loginButtonContainer: {
    marginTop: hp(4),
    justifyContent: "center",
    alignItems: "center",
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
