import {GET_CATEGORIES,
UPDATE_ACTIVE_CATEGORY} from "./Category.type"

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const updateSelectedCategory = (category) => ({
  type: UPDATE_ACTIVE_CATEGORY,
  category,
});
