import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FavoriteScreen = (props) => {
  const { navigation } = props;
  const favMeals = MEALS.filter((meal) => meal.id === "m1" || meal.id === "m2");

  return <MealList navigation={navigation} listData={favMeals} />;
};

FavoriteScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.openDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoriteScreen;
