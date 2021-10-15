import { combineReducers } from "redux";
import loading from "./loading";
import products from "./products";
import category from "./category";

export default combineReducers({loading, products, category});