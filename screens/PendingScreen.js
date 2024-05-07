import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { users } from "./CardScreen";
import { useUserContext } from "../context/UserContext";

const PendingScreen = () => {
  const { user } = useUserContext();
  console.log("liked", user.userLikedProfile);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user.userLikedProfile.map((user, index) => (
        <View key={user.userName} style={styles.profileContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.profileImage} />
          <Text style={styles.profileName}>{user.fulleName}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    marginTop: 10,
  },
});
