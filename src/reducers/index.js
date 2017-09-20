import { combineReducers } from "redux";
import comments from "./comments";
import posts from "./posts";
import categories from "./categories";
import common from "./common";

export default combineReducers({ comments, posts, categories, common });
