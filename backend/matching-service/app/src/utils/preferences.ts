import _ from "lodash";
import { Preferences } from "../matching/matching.interfaces";

export const comparePreferences = (
  p1: Preferences,
  p2: Preferences
): boolean => {
  // Check if difficulty matches
  if (_.isEqual(p1.difficulties, p2.difficulties)) {
    // Check if object1's topics are a subset of or equal to object2's topics and vice versa
    if (
      _.intersection(p1.topics, p2.topics).length === p1.topics.length ||
      _.intersection(p1.topics, p2.topics).length === p2.topics.length
    ) {
      return true;
    }
  }
  return false;
};
