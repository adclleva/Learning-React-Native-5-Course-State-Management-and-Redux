import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";

const FavoriteScreen = (props) => {
  const { navigation } = props;
  const favMeals = MEALS.filter((meal) => meal.id === "m1" || meal.id === "m2");

  return <MealList navigation={navigation} listData={favMeals} />;
};

FavoriteScreen.navigationOptions = {
  headerTitle: "Your Favorites",
};

export default FavoriteScreen;
