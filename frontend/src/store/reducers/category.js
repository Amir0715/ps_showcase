import { SET_CATEGORIES } from "../actions/categories";

const initial = [{
    id: NaN,
    name: "",
    slug: "",
    children: []
}];

// редюсер для работы с ресурсом продукт 
const categories = (state=initial, action) => {
    switch (action.type) {
        case SET_CATEGORIES: return action.value ;
        default: return state;
    }
};

export default categories;