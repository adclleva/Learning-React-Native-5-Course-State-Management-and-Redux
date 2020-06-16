/**
 * this is because we are using based on 4.x
 * this will give the ability to hold different screens
 */
import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

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

const tabsScreenConfig = {
  // this will be the tabs config depending on the OS
  Meals: {
    screen: MealsNavigator, // you can use what we created with the createStackNavigator to be part of this stack
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        ); // we can use any icon name with the Ionicons from expo/icons
      },
      tabBarColor: Colors.primaryColor, // this only works for android with the material
    },
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />; // we can use any icon name with the Ionicons from expo/icons
      },
      tabBarColor: Colors.accentColor, // this only works with shifting
    },
  },
};

// this is to set up the tab navigator
const MealsTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabsScreenConfig, {
        // this only works for android
        // for material bottom tabs navigator, this should actually be activeColor for android
        activeColor: "#fff",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabsScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor, // this will change the color of the tintColor when the activeTintColor changes
        },
      });

// we used to wrap our main navigator with createAppContainer
// we then have our root navigator be the tab navigator, which can have nested navigators
export default createAppContainer(MealsTabNavigator);
