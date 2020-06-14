/**
 * this is because we are using based on 4.x
 * this will give the ability to hold different screens
 */

import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
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
        backgroundColor:
          Platform.OS === "android" ? Colors.primaryColor : "#fff",
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primaryColor,
    },
  }
); // this is basically a react component

// we wrap our main navigator with createAppContainer
export default createAppContainer(MealsNavigator);
