/**
 * this is because we are using based on 4.x
 * this will give the ability to hold different screens
 */

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";

const MealsNavigator = createStackNavigator({
  // we will have any identifier as a property name
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen,
}); // this is basically a react component

// we wrap our main navigator with createAppContainer
export default createAppContainer(MealsNavigator);
