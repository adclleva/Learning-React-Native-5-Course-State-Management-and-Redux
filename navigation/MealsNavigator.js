/**
 * this is because we are using based on 4.x
 * this will give the ability to hold different screens
 */

import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import Colors from "../constants/Colors";

const MealsNavigator = createStackNavigator(
  {
    // we will have any identifier as a property name
    Categories: {
      // since this is the first key/value pair, it will be the first screen to load
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    // mode: "modal", // this changes the transition animation
    // initialRouteName: 'CategoryMeals' // this can be the initial page for the routes
    defaultNavigationOptions: {
      // these gives you options that apply to every screen and get can overwritten
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primaryColor,
    },
  }
); // this is basically a react component

// this is to set up the tab navigator
const MealsTabNavigator = createBottomTabNavigator({
  Meals: MealsNavigator, // you can use what we created with the createStackNavigator to be part of this stack
  Favorites: FavoritesScreen,
});

// we used to wrap our main navigator with createAppContainer
// we then have our root navigator be the tab navigator, which can have nested navigators
export default createAppContainer(MealsTabNavigator);
