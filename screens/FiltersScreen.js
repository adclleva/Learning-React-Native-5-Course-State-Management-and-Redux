import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";

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
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

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
          onPress={() => navData.navigation.openDrawer()}
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
    fontFamily: "opens-sans",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 50,
  },
});
