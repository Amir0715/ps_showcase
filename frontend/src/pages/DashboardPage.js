import { useEffect } from "react";
import EnhancedTable from "../components/tableSortSelect";
import api from "../api/api"; 
import store from "../store/store";

const DashboardPage = () => {
    useEffect(() => {
        api.getProducts().then(() => {
            console.log(store.getState());
        });
    }, []);
    
    return <EnhancedTable tabletitle="Продукты" />;
};

export default DashboardPage;
