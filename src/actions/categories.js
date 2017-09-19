import { baseFetchHeaders } from "../utils/http-helpers";

export const FETCH_CATEGORIES_SUCCESSFUL = "FETCH_CATEGORIES_SUCCESSFUL";
export const FETCH_CATEGORIES_HAS_ERRORED = "FETCH_CATEGORIES_HAS_ERRORED";
export const FETCH_CATEGORIES_LOADING = "FETCH_CATEGORIES_LOADING";

export function fetchCategoriesHasErrored() {
  return {
    type: FETCH_CATEGORIES_HAS_ERRORED,
    hasErrored: true
  };
}

export function fetchCategoriesLoading(isLoading) {
  return {
    type: FETCH_CATEGORIES_LOADING,
    isLoading
  };
}

export function fetchCategoriesSuccessful(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESSFUL,
    items: categories
  };
}

export function categoriesFetchData(url) {
  return dispatch => {
    dispatch(fetchCategoriesLoading(true));

    fetch(url, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchCategoriesLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(response => {
        dispatch(fetchCategoriesSuccessful(response.categories));
      })
      .catch(error => {
        dispatch(fetchCategoriesHasErrored());
      });
  };
}
