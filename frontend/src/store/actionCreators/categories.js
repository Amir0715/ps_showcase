import { ADD_CATEGORY, SET_CATEGORIES, DELETE_CATEGORY, EDIT_CATEGORY } from "../actions/categories";

export const setCategories = (categories) => ({ type: SET_CATEGORIES, value: categories });
