import { StyleSheet, Text, View } from "react-native";
import React from "react";

const VisitProfileScreen = ({ route }) => {
  const param = route.params; // do not delete
  console.log("ong", param); // ""
  return (
    <View>
      <Text>{param.user.fullName}</Text>
    </View>
  );
};

export default VisitProfileScreen;

const styles = StyleSheet.create({});
