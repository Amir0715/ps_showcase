import * as React from "react";
import api from "../api/api";
import store from "../store/store";


const ProductPage = (props) => {
    React.useEffect(() => {
        api.getProduct(1)
        .then(() => {
            const product = store.getState().products.current;
            console.log(product);
        })
        .catch();
    }, []);

    return(<></>);
};

export default ProductPage;