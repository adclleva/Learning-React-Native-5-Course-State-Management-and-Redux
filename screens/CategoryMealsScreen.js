import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const CategoryMealsScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen!</Text>
      <Button
        title="Go to Category Details Screen"
        onPress={() => {
          navigation.navigate("MealDetail");
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          // alternatively you can use pop() instead of goBack()
          // pop only works in stack navigators
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
