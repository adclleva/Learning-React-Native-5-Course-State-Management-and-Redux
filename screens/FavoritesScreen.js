import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FavoriteScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Favorite Screen!</Text>
    </View>
  );
};

FavoriteScreen.navigationOptions = {
  headerTitle: "Your Favorites",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavoriteScreen;
