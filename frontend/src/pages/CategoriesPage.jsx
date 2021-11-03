import { useEffect } from "react";
import api from "../api/api";
import EnhancedTable from "../components/widgets/tableSortSelect";
import store from "../store/store";
import * as React from 'react';

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
        id: 'slug',
        type: "numeric",
        align: "left",
        disablePadding: false,
        label: 'Слаг',
    },
    {
        id: 'children',
        type: "array",
        align: "left",
        disablePadding: false,
        label: 'Потомки',
    }
];

const CategoriesPage = () => {
    const [data, setData] = React.useState([{}]);


    useEffect(() => {
        api.getAllCategories().then(() => {
            const category = store.getState().category;
            console.log(category);
            setData(category);
        });
    }, []);

    return (
        <EnhancedTable tabletitle="Категории" headCells={headCells} rows={data} />
    );
};

export default CategoriesPage;
