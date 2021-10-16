import { useEffect } from "react";
import api from "../api/api";
import store from "../store/store";

// TODO: ДОДЕЛАТЬ ТАБЛИЦУ, СДЕЛАТЬ ЕЕ ЧИТАБЕЛЬНЕЕ, МБ ПЕРЕМЕСТИТЬ 
// В КАТАЛОГ И РАЗБИТЬ НА ФАЙЛЫ ОТДЕЛЬНЫЙЕ ЧАСТИ, НАПРИМЕР КОМПОНЕНТ СТРОКА, 
// ЗАГАЛОВОК, ТУЛЛБАР, ФУТТЕРБАР И ТП
const DashboardPage = () => {
    useEffect(() => {
        api.getProducts().then(() => {
            console.log(store.getState());
        });
    }, []);
    return <div></div>;
};

export default DashboardPage;
