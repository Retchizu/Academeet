import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
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
import {
  isValidEmail,
  isValidObjField,
  validationSchema,
} from "../methods/validator";
import { Formik } from "formik";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [fontLoaded, setFontLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userCredential = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const registerAccount = (values, formikActions) => {
    console.log(values);
  };

  return (
    <View
      style={styles.container}
      enabled
      keyboardVerticalOffset={-500}
      behavior="padding"
    >
      <Formik
        initialValues={userCredential}
        onSubmit={registerAccount}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          const { userName, email, password, confirmPassword } = values;
          return (
            <>
              <View style={styles.centerView}>
                <SvgXml xml={SVGLogo} />
                <Text style={styles.logoText}>academeet</Text>
              </View>

              <View style={styles.textInputContainer}>
                {touched.userName && errors.userName && (
                  <Text style={styles.errorMessage}>{errors.userName}</Text>
                )}
                <TextInput
                  style={styles.inputField}
                  onChangeText={handleChange("userName")}
                  value={userName}
                  placeholder="Username"
                  placeholderTextColor="#6D6D6D"
                  onBlur={handleBlur("userName")}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.inputField}
                  onChangeText={handleChange("email")}
                  value={email}
                  placeholder="Email"
                  placeholderTextColor="#6D6D6D"
                  onBlur={handleBlur("email")}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInputField}
                    onChangeText={handleChange("password")}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="#6D6D6D"
                    secureTextEntry={!showPassword}
                    onBlur={handleBlur("password")}
                    error={touched.password && errors.password}
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
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorMessage}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInputField}
                    onChangeText={handleChange("confirmPassword")}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor="#6D6D6D"
                    secureTextEntry={!showConfirmPassword}
                    onBlur={handleBlur("confirmPassword")}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIconContainer}
                  >
                    <Entypo
                      name={showConfirmPassword ? "eye" : "eye-with-line"}
                      size={24}
                      color="#6D6D6D"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ alignItems: "center" }}>
                <View style={styles.registerButtonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: hp(2),
                  }}
                >
                  <Text style={styles.registerText}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LogInScreen")}
                  >
                    <Text style={styles.registerLink}>Login here.</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  centerView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(5),
  },
  inputField: {
    fontFamily: "lato-light",
    borderWidth: wp(0.3),
    borderColor: "#414042",
    borderRadius: wp(5),
    marginVertical: hp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: "#FFFFFF",
    fontSize: hp(3),
  },
  passwordInputField: {
    flex: 1,
    fontSize: hp(3),
    fontFamily: "lato-light",
  },
  textInputContainer: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#414042",
    marginHorizontal: wp(12),
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: wp(5),
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    padding: wp(2),
    marginVertical: hp(2),
  },
  eyeIconContainer: { marginRight: wp(2) },
  logoText: {
    fontFamily: "lato-bold",
    fontSize: wp(8),
    color: "#FF9E00",
  },
  container: {
    backgroundColor: "#023E8A", //
    flex: 1,
  },
  registerButtonContainer: {
    marginTop: hp(4),
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
  },
  registerButton: {
    backgroundColor: "#0077B6",
  },
  buttonText: {
    fontFamily: "lato-light",
    fontSize: wp(4),
    color: "#FFFFFF",
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
  errorMessage: {
    color: "#FF9E00",
    fontFamily: "lato-regular",
    fontSize: wp(3),
    textAlign: "right",
    marginHorizontal: wp(8),
    marginVertical: hp(0.2),
  },
});
