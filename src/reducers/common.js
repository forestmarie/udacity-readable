import { FETCH_LOADING, FETCH_ERRORED } from "../actions/common";

const commonInitialState = {
  errors: {},
  loading: {}
};

const common = (state = commonInitialState, action) => {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        loading: {
          [action.name]: action.isLoading
        }
      };

    case FETCH_ERRORED:
      return {
        loading: {
          [action.name]: action.hasErrored
        }
      };

    default:
      return state;
  }
};

export default common;
