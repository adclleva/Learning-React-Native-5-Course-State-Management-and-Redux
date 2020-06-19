import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";

const ListItem = (props) => {
  // this component will be for the list items that we're generating
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const { navigation } = props;
  const mealId = navigation.getParam("mealId");
  const availableMeals = useSelector((state) => state.meals.meals);
  const selectedMeal = availableMeals.find((meal) => mealId === meal.id);
  const {
    duration,
    complexity,
    affordability,
    imageUrl,
    ingredients,
    steps,
    title,
  } = selectedMeal;

  // when this component renders, it sends these params to be available to the navigation
  // we would have to have it within a useEffect to avoid an infinite loop since it is changing the props
  // useEffect(() => {
  //   navigation.setParams({
  //     mealTitle: title,
  //   });
  // }, [selectedMeal]);
  // we don't pass it down to the navigation because the component will render before it's passed to the navigation

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{duration}m</DefaultText>
        <DefaultText>{complexity.toUpperCase()}</DefaultText>
        <DefaultText>{affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ingredients.map((ingredient, index) => {
        return <ListItem key={`${ingredient}${index}`}>{ingredient}</ListItem>;
      })}
      <Text style={styles.title}>Steps</Text>
      {steps.map((step, index) => {
        return <ListItem key={step}>{`${index + 1}. ${step}`}</ListItem>;
      })}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  // we are getting the title from the params passed from the component
  // it's better to get the params from the navigation that triggers the navigation action to render this component
  const mealTitle = navigationData.navigation.getParam("mealTitle");

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      // this is the initial set up for the react-navigation-header-buttons to have the star icon to be on the right
      // refer to this for more guidance https://github.com/vonovak/react-navigation-header-buttons
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log(`${mealTitle} is marked as Favorite`);
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200, // we can use the dimensions api to configure this
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
