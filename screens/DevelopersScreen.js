import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native"; // Import Image
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { loadFont } from "../misc/loadFont";
import { SVGprevious } from "../misc/loadSVG";

// Import images
import img1 from "../assets/Tito.jpg";
import img2 from "../assets/Tita.jpg";
import img3 from "../assets/Romy.jpg";
import img4 from "../assets/kebong.jpg";

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
      image: img2,
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
    <View style={styles.container}>
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

      <View style={styles.developersContainer}>
        <FlatList
          data={developersData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.developerContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.developerName}>{item.name}</Text>
                <Text style={styles.developerPosition}>{item.position}</Text>
                <Text style={styles.developerLanguage}>{item.language}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023E8A",
    paddingHorizontal: wp(2),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(2),
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
  developersContainer: {
    flex: 1,
    backgroundColor: "#0077B6",
    borderRadius: hp(3),
    paddingVertical: hp(-1),
    paddingHorizontal: wp(2),
    marginTop: hp(-2),
    marginBottom: hp(2),
  },
  developerContainer: {
    flexDirection: "row",
    marginVertical: hp("1%"),
    backgroundColor: "#0077B6",
    borderRadius: hp(10),
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
  developerPosition: {
    fontSize: wp(3.5),
    fontFamily: "lato-regular",
    padding: 2.5,
    color: "#FFFFFF",
    paddingBottom: hp(1),
  },
  imageContainer: {
    marginRight: wp(2),
  },
  textContainer: {
    flexDirection: "column",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    margin: 10,
  },
});

export default DevelopersScreen;
