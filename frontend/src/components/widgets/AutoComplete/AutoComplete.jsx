import { Box, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as React from "react";
import api from "../../../api/api";
import store from "../../../store/store";

const AutoComplete = ({ formik, ...props }) => {

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
                )
                }
            />
        </Box>
    );
};

export default AutoComplete;