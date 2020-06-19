/**
 * it gets the current state snapshot and will derive a new state
 * when an action gets dispatched
 */
import { MEALS } from "../../data/dummy-data";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [], // we can save the data in a server, but we'll make it empty here
};

const mealsReducer = (state = initialState, action) => {
  return state;
};

export default mealsReducer;
