import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { users } from './CardScreen'; 

const PendingScreen = () => {

  const likedButNotLikedBack = users.filter(user => user.likedBack === false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {likedButNotLikedBack.map((user, index) => (
        <View key={index} style={styles.profileContainer}>
          <Image source={user.uri} style={styles.profileImage} />
          <Text style={styles.profileName}>{user.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
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
