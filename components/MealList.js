import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
  // we'll be using the same logic of FlatList for the CategoriesScreen
  // ! it's important that the navigation works only on the components that are loaded within the navigator and not nested components
  // ! thus why we always forward the navigation props down to get the functionality from the loaded component
  const { listData, navigation } = props;

  const renderMealItem = (itemData) => {
    const { item } = itemData;

    return (
      <MealItem
        title={item.title}
        onSelectMeal={() => {
          navigation.navigate("MealDetail", {
            mealId: item.id,
          });
        }}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        image={item.imageUrl}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={(item) => renderMealItem(item)}
        // we add a style here so the child can widths can fill up to te width of the parent
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});

export default MealList;
