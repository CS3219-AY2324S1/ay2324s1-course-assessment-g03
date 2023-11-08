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
      _.intersection(p1.topic, p2.topic).length === p1.topic.length ||
      _.intersection(p1.topic, p2.topic).length === p2.topic.length
    ) {
      return true;
    }
  }
  return false;
};
