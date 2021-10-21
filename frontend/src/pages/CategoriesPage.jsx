import { useEffect } from "react";
import api from "../api/api";
import store from "../store/store";

const CategoriesPage = () => {
    useEffect(() => {
        api.getCategories().then(() => {
            console.log(store.getState());
        });
    }, []);
    return (<h1>CategoriesPage</h1>);
};

export default CategoriesPage;
