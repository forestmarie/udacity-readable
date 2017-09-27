import { baseFetchHeaders, BaseApiUrl } from "../utils/http-helpers";
import { fetchErrored, fetchLoading } from "./common";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

export function fetchCategoriesSuccessful(categories) {
  return {
    type: FETCH_CATEGORIES,
    items: categories
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchLoading(FETCH_CATEGORIES, true));

    return fetch(`${BaseApiUrl}/categories`, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchLoading(FETCH_CATEGORIES, false));
        return response;
      })
      .then(response => response.json())
      .then(response => {
        dispatch(fetchCategoriesSuccessful(response.categories));
      })
      .catch(error => {
        dispatch(fetchErrored(FETCH_CATEGORIES));
      });
  };
}
