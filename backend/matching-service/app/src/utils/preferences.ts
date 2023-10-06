import _ from "lodash";
import { Preferences } from "../matching/matching.interfaces";

export const comparePreferences = (
  p1: Preferences,
  p2: Preferences
): boolean => {
  // Check if difficulty matches
  if (_.isEqual(p1.difficulty, p2.difficulty)) {
    // Check if object1's topics are a subset of or equal to object2's topics and vice versa
    if (
      _.intersection(p1.category, p2.category).length === p1.category.length ||
      _.intersection(p1.category, p2.category).length === p2.category.length
    ) {
      return true;
    }
  }
  return false;
};
