import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { MEALS } from "../data/dummy-data";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

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
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => mealId === meal.id);

  return {
    headerTitle: selectedMeal.title,
    headerRight: () => (
      // this is the initial set up for the react-navigation-header-buttons to have the star icon to be on the right
      // refer to this for more guidance https://github.com/vonovak/react-navigation-header-buttons
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log(`${selectedMeal.title} is marked as Favorite`);
          }}
        />
      </HeaderButtons>
    ),
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
