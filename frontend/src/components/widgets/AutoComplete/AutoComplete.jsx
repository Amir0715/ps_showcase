import { Box, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as React from "react";
import api from "../../../api/api";
import store from "../../../store/store";

const AutoComplete = ({ formik, isEditing, ...props }) => {

    const [options, setOptions] = React.useState({ categories: [], subCategories: [] });
    const [selectedCategory, setSelectedCategory] = React.useState({});
    const [selectedSubCategories, setSelectedSubCategories] = React.useState([]);
    const [subSelectDisabled, setSubSelectDisabled] = React.useState(true);

    const handleCategoryChange = (event, value) => {
        event.preventDefault();
        setSelectedCategory(value);
        formik.setFieldValue("category", value);

        // очищаем селект для подкатегории и формик поле
        setSubSelectDisabled(true);
        setSelectedSubCategories([]);
        formik.setFieldValue("subcategories", []);
        setOptions(options => ({ ...options, subCategories: [] }));

        // нужно взять из стора все категории, достать потомков для категории у которого id === value.id 
        const children = store.getState().category.find((category) => category.id === value.id).children;
        // и подсунуть для подкатегории option 
        setOptions(options => ({ ...options, subCategories: children }));
        setSubSelectDisabled(false);

    };
    const handleSubCategoryChange = (event, value) => {
        event.preventDefault();
        setSelectedSubCategories(value);
        formik.setFieldValue("subcategories", value);
    };

    React.useEffect(() => {
        api.getCategories()
            .then(() => {
                const res = store.getState().category;
                const parents = res.map((category) => ({ id: category.id, name: category.name, slug: category.slug }));
                setOptions(options => ({ ...options, categories: parents }));
                console.log("parents = ", parents);
            });
    }, []);

    React.useEffect(() => {
        if (isEditing) {
            const res = store.getState().category;
            // если это загрузка
            console.log(isEditing);
            const product_category = store.getState().products.current.category;
            console.log(product_category);
            // const product_categories = res.map(category => category.children.filter(children => product_category.includes(children.id)));
            let product_categories = {};
            res.map(element => {
                const childrens = element.children.filter(children => product_category.includes(children.id))
                    .map(childrencategory => ({ id: childrencategory.id, name: childrencategory.name, slug: childrencategory.slug }));
                console.log(childrens);
                if (childrens.length > 0) {
                    // данный родитель имеет хотя бы одну нужную нам категорию
                    product_categories = { id: element.id, name: element.name, slug: element.slug, children: childrens };
                }
                return element;
            });
            console.log(product_categories);
            setSelectedCategory({id: product_categories.id, name: product_categories.name, slug: product_categories.slug});
            formik.setFieldValue("category", {id: product_categories.id, name: product_categories.name, slug: product_categories.slug});
            setSelectedSubCategories(product_categories.children);
            formik.setFieldValue("subcategories", product_categories.children);
            setSubSelectDisabled(false);
        }
    }, [isEditing]);

    return (
        <Box margin={1}>
            <Autocomplete
                name="categories"
                options={options.categories}
                value={selectedCategory}
                getOptionLabel={(data) => data.name ? data.name : ""}
                onChange={handleCategoryChange}
                sx={{ width: 300 }}
                disableClearable
                required
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={formik.touched['categories'] && !!formik.errors['categories']}
                        helperText={formik.touched['categories'] && formik.errors['categories']}
                        label="Категория"
                        variant="outlined"
                    />
                )}
            />
            <Autocomplete
                name="subcategories"
                options={options.subCategories}
                value={selectedSubCategories}
                getOptionLabel={(data) => data.name ? data.name : ""}
                onChange={handleSubCategoryChange}
                sx={{ width: 300 }}
                disabled={subSelectDisabled}
                multiple
                required
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={formik.touched['subcategories'] && !!formik.errors['subcategories']}
                        helperText={formik.touched['subcategories'] && formik.errors['subcategories']}
                        label="Подкатегория"
                        variant="outlined"
                    />
                )}
            />
        </Box>
    );
};

export default AutoComplete;