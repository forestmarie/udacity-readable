import {
  FETCH_CATEGORIES_SUCCESSFUL,
  FETCH_CATEGORIES_HAS_ERRORED,
  FETCH_CATEGORIES_LOADING
} from "../actions";

const categoriesInitialState = {
  items: [],
  hasErrored: false,
  isLoading: false
};

const categories = (state = categoriesInitialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };

    case FETCH_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case FETCH_CATEGORIES_SUCCESSFUL:
      return {
        hasErrored: false,
        isLoading: state.isLoading,
        items: action.items
      };

    default:
      return state;
  }
};

export default categories;
