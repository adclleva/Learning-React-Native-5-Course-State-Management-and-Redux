import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { MEALS } from "../data/dummy-data";

const MealDetailScreen = (props) => {
  const { navigation } = props;
  const mealId = navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => mealId === meal.id);

  return (
    <View style={styles.screen}>
      <Text>The Meal Detail Screen!</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          navigation.popToTop();
        }}
      />
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  console.log("navigationData", navigationData);
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => mealId === meal.id);
  console.log("selectedMeal", selectedMeal);

  return {
    headerTitle: selectedMeal.title,
  };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
