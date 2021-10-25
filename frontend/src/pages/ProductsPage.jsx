import { useEffect } from "react";
import api from "../api/api";
import EnhancedTable from "../components/widgets/tableSortSelect";
import store from "../store/store";

const headCells = [
    {
        id: 'id',
        type: "numeric",
        align: "left",
        disablePadding: true,
        label: 'Id',
    },
    {
        id: 'name',
        type: "string",
        align: "left",
        disablePadding: false,
        label: 'Название',
    },
    {
        id: 'price',
        type: "numeric",
        align: "left",
        disablePadding: false,
        label: 'Цена (сом)',
    },
    {
        id: 'stock',
        type: "numeric",
        align: "left",
        disablePadding: false,
        label: 'Количество (шт)',
    },
    {
        id: 'available',
        type: "boolean",
        align: "left",
        disablePadding: false,
        label: 'Доступно',
    },
    {
        id: 'incarousel',
        type: "boolean",
        align: "left",
        disablePadding: false,
        label: 'В карусели',
    },
    {
        id: 'inbanner',
        type: "boolean",
        disablePadding: false,
        label: 'В баннере',
    },
];

const ProductsPage = () => {
    useEffect(() => {
        api.getProducts().then(() => {
            
        });
    }, []);

    return <EnhancedTable tabletitle="Продукты" headCells={headCells} rows={store.getState().products} />;
};

export default ProductsPage;
