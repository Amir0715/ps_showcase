import { ADD_PRODUCT, SET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT } from "../actions/products";
// reducer - функция которая отвечает за обновленения 
// состояний. Принимает два параметра, первый -- текущее состояния, и обэект события,
// объект события содержит в себе два свойства -- тип события (action.type) и значения события (action.value)

const initial = [{
    id: NaN,
    name: "",
    slug: "",
    price: "",
    description: "",
    stock: NaN,
    available: null,
    incarousel: null,
    inbanner: null,
    created_at: "",
    updated_at: ""
}];

// редюсер для работы с ресурсом продукт 
const products = (state=initial, action) => {
    switch (action.type) {
        case SET_PRODUCTS: return action.value ;
        default: return state;
    }
};

export default products;