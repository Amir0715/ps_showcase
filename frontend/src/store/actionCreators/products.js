import { SET_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from "../actions/products";

/**
 * добавляет продукт в стор
 */
const addProduct = (product) => (
    {
        type: ADD_PRODUCT,
        value: product,
    }
);

/**
 * изменяет продукт в сторе
 */
const editProduct = (product) => (
    {
        type: EDIT_PRODUCT,
        value: product,
    }
);

/**
 * переписывает продукты в сторе 
 */
const setProducts = (products) => (
    {
        type: SET_PRODUCTS,
        value: products
    }
);

const deleteProduct = (id) => (
    {
        type: DELETE_PRODUCT,
        value: id
    }
);

export { setProducts };