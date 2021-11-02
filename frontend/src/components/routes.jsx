import { Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import OrdersPage from "../pages/OrdersPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductsPage from "../pages/ProductsPage";
import UsersPage from "../pages/UsersPage";
import StatisticsPage from "../pages/StatisticsPage";
import SettingsPage from "../pages/SettingsPage";
import ProductPage from "../pages/ProductPage";


const structure = [
    { title: "Главная", to: "/", component: DashboardPage},
    { title: "Заказы", to: "/orders", component: OrdersPage},
    { title: "Категории", to: "/categories", component: CategoriesPage},
    { title: "Продукты", to: "/products", component: ProductsPage },
    { title: "Продукт", to: "/product", component: ProductPage },
    { title: "Пользователи", to: "/users", component: UsersPage},
    { title: "Статистика", to: "/statistics", component: StatisticsPage },
    { title: "Настройки", to: "/settings", component: SettingsPage },
    { title: "Профиль", to: "/profile", component: SettingsPage },
];

const RoutersMap = () =>{
    const data = structure.map(({title, path, component}, key) => <Route exact path={path} component={component} key={key} />);
    console.log(data);
    return data;
};

export default RoutersMap;
export { structure };
