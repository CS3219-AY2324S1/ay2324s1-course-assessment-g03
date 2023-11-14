import _ from "lodash";
import { Preferences } from "../matching/matching.interfaces";

export const getIntersectionPreferences = (
  p1: Preferences,
  p2: Preferences
): Preferences => {
  return {
    difficulty: _.intersection(p1.difficulty, p2.difficulty),
    topic: _.intersection(p1.topic, p2.topic),
  };
};

export const comparePreferences = (preferences: Preferences): boolean => {
  return (
    (!!preferences.difficulty.length && !!preferences.topic.length) ||
    (preferences.difficulty.length === 0 && preferences.topic.length === 0)
  );
};
