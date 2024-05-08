import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native"; // Import Image
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SVGprevious } from "../misc/loadSVG";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { loadFont } from "../misc/loadFont";

// Import images
import img1 from "../misc/ErlXXRich.jpg";
import img2 from "../misc/Ret.png";
import img3 from "../misc/Romel.jpg";
import img4 from "../misc/Keb.png";

const DevelopersScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const developersData = [
    {
      name: "Baltazar, Richmond",
      language: "JavaScript, Typescript",
      position: "Lead Programmer | Backend Developer",
      image: img2, // Assign the correct image source
    },
    {
      name: "De leon, Erlyn",
      language: "Java",
      position: "Programmer",
      image: img1,
    },
    {
      name: "Lisboa, Kevin Ros",
      language: "Java",
      position: "Programmer",
      image: img4,
    },
    {
      name: "Petracorta, Romnoel",
      language: "GDScript, Python, C#",
      position: "UI/UX Designer | Programmer",
      image: img3,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SvgXml
          xml={SVGprevious}
          width={45}
          height={45}
          style={styles.previousIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>developers</Text>
      </View>
      <View style={styles.appearanceContainer}>
        <FlatList
          data={developersData}
          keyExtractor={(item, index) => index.toString()} // Add keyExtractor
          renderItem={({ item }) => (
            <View style={styles.developerContainer}>
              <Image
                source={item.image}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  margin: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.developerName}>{item.name}</Text>
                <Text style={styles.developerposition}>{item.position}</Text>
                <Text style={styles.developerLanguage}>{item.language}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(5),
    paddingHorizontal: hp(1),
  },
  previousIcon: {
    marginLeft: wp(2),
    marginRight: wp(5),
    marginBottom: hp(4),
  },
  headerText: {
    fontSize: wp(7),
    fontFamily: "lato-bold",
    color: "#FF9E00",
    paddingBottom: hp(5),
    paddingLeft: wp(15),
  },
  developerContainer: {
    flexDirection: "row",
    marginVertical: hp("1%"),
    padding: 10,
    backgroundColor: "#0077B6",
    borderRadius: 10,
    alignItems: "center",
  },
  developerName: {
    fontSize: wp(5),
    fontFamily: "lato-regular",
    paddingBottom: hp(1),
    color: "#FFFFFF",
  },
  developerLanguage: {
    fontSize: wp(4),
    fontFamily: "lato-regular",
    color: "#FFFFFF",
    paddingBottom: hp(2),
  },
  developerposition: {
    fontSize: wp(3.5),
    fontFamily: "lato-regular",
    padding: 2.5,
    color: "#FFFFFF",
    paddingBottom: hp(1),
  },
  appearanceContainer: {
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#0077B6",
    marginBottom: hp("10"),
    paddingTop: hp(2),
  },
});

export default DevelopersScreen;
