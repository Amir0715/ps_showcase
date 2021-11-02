import { combineReducers } from "redux";
import loading from "./loading";
import products from "./products";
import category from "./category";
import user from "./user";
import authorized from "./authorized";
import table from "./table";

export default combineReducers({loading, products, category, user, authorized, table});