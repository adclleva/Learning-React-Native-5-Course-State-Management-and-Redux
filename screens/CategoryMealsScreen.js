import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

const CategoryMealsScreen = (props) => {
  const { navigation } = props;

  const categoryId = navigation.getParam("categoryId");

  // this will return all the meals that match the categoryId
  const currentMealsData = MEALS.filter((meal) => {
    return meal.categoryIds.includes(categoryId);
  });

  const renderMealItem = (itemData) => {
    const { item } = itemData;

    return (
      <MealItem
        title={item.title}
        onSelectMeal={() => {}}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        image={item.imageUrl}
      />
    );
  };

  // const selectedCategory = CATEGORIES.find(
  //   (category) => category.id == categoryId
  // );

  return (
    <View style={styles.screen}>
      <FlatList
        data={currentMealsData}
        keyExtractor={(item, index) => item.id}
        renderItem={(item) => renderMealItem(item)}
        // we add a style here so the child can widths can fill up to te width of the parent
        style={{ width: "100%" }}
      />
    </View>
  );
};

// you can also have the navigation as a function and return what we want
// we get the same navigation props that we get in our component props
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
