import React from "react";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoryMealsScreen = (props) => {
  const { navigation } = props;

  const categoryId = navigation.getParam("categoryId");

  // this will return all the meals that match the categoryId
  const currentMealsData = MEALS.filter((meal) => {
    return meal.categoryIds.includes(categoryId);
  });

  // const selectedCategory = CATEGORIES.find(
  //   (category) => category.id == categoryId
  // );

  // we pass down the navigation props to enable the navigate property to pass the params down
  return <MealList listData={currentMealsData} navigation={navigation} />;
};

/**
 * you can also have the navigation as a function and return what we want
 * we get the same navigation props that we get in our component props
 * navigationData gives us an object of options to use
 * we always return the object for the navigation options to use
 * this allows us to get the data dynamically
 */
CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((category) => {
    return categoryId === category.id;
  });

  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;
