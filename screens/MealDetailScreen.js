import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

// useDispatch gives us an easier way of firing a function and only within the component and not the navigation options
// we can solve that issue by just having it passed by through the parent
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals"; // we call the action creator and not the identifier

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
  } = selectedMeal;

  const dispatch = useDispatch(); // this is how we're going to dispatch our actions

  // we create a function that would handle the dispatch action for toggling the favorite
  // we use useCallback to avoid infinite loops since the navigation is changing with the component rendering
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(selectedMeal.id)); // we could have also used the mealId from the navigation param props
  }, [dispatch, selectedMeal]);

  // here we are passing down the toggleFavoriteHandler to the navigation options within the component
  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);
  // thanks to the useCallback, we won't enter an infinite loop with toggleFavoriteHandler is always changing

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
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      // this is the initial set up for the react-navigation-header-buttons to have the star icon to be on the right
      // refer to this for more guidance https://github.com/vonovak/react-navigation-header-buttons
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Favorite" iconName="ios-star" onPress={toggleFavorite} />
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
