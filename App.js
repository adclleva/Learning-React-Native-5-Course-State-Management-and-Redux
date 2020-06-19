import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";

// this can provide the store to the app
import { Provider } from "react-redux";

import MealsNavigator from "./navigation/MealsNavigator";
import mealsReducer from "./store/reducers/meals";

// we can utilize what is managed through these reducers with the help of the meals property
const rootReducer = combineReducers({
  meals: mealsReducer,
});

// creates store takes a reducer at the end
const store = createStore(rootReducer);

/**
 * provides native primitives to represent screens instead of plain <View> components
 * in order to better take advantage of operating system behavior
 * and optimizations around screens. Used by library authors,
 * unlikely to be used directly by most app developers.
 */
enableScreens();

const fetchFonts = () => {
  // this will return a promise
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
