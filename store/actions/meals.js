// we have it as a constant to make it easier for development when importing to avoid typos
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

// we'll follow this action creators pattern when an action is an object
// that has an identifier and a payload, thus creating this function that creates such a thing

export const toggleFavorite = (id) => {
  // this is an action creator
  // this will return an object that describes the action
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};
