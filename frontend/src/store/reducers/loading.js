import { LOADING } from "../actions/loading";
// reducer - функция которая отвечает за обновленения 
// состояний. Принимает два параметра, первый -- текущее состояния, и обэект события,
// объект события содержит в себе два свойства -- тип события (action.type) и значения события (action.value)

const loading = (state=false, action) => {
    switch (action.type) {
        case LOADING: return action.value;
        default: return state;
    }
};

export default loading;