import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import { Item, HeaderButtons } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = (props) => {
  const { value, onValueChange, title } = props;
  return (
    <View style={styles.filterContainer}>
      <Text>{title}</Text>
      <Switch
        // this sets the value of on/off
        value={value}
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        onValueChange={onValueChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  // this hook is to dispatch actions
  const dispatch = useDispatch();

  // this is to control and save the filter choices
  // the useCallback has React to cache the function and calls it only when the dependencies change
  // useCallbacks usually runs in conjunction with useEffect to avoid infinite loops whenever the appliedFilters data changes and the component rer-renders
  const saveFilters = useCallback(() => {
    // the keys here much match the keys in the reducer
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    console.log(appliedFilters);
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    // this is a valid way to communicate with the component to the navigationOptions
    // set params updates the params for the currently loaded screen
    navigation.setParams({
      save: saveFilters,
    });
    // if savFilters, the useEffect runs and not use navigation as a dependency to avoid infinite loops
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        value={isGlutenFree}
        onValueChange={(newValue) => setIsGlutenFree(newValue)}
        title={"Gluten-Free"}
      />
      <FilterSwitch
        value={isLactoseFree}
        onValueChange={(newValue) => setIsLactoseFree(newValue)}
        title={"Lactose-Free"}
      />
      <FilterSwitch
        value={isVegan}
        onValueChange={(newValue) => setIsVegan(newValue)}
        title={"Vegan"}
      />
      <FilterSwitch
        value={isVegetarian}
        onValueChange={(newValue) => setIsVegetarian(newValue)}
        title={"Vegetarian"}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filters",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            // we do this to have it executed for the pointer to the function
            navData.navigation.getParam("save")();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});
