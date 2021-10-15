import { createStore } from "redux";
import reducer from "./reducers/combine"; 

// store - глобальное хранилище для состояний, принимает во вход функцию-редюсер 

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;