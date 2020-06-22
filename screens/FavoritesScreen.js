import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";

const FavoriteScreen = (props) => {
  const { navigation } = props;

  // this slices the meals state from the combined reducer and will get the meals state from it
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
