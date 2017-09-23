import { FETCH_CATEGORIES } from "../actions/categories";

const categoriesInitialState = {
  items: []
};

const categories = (state = categoriesInitialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        items: action.items
      };

    default:
      return state;
  }
};

export default categories;
