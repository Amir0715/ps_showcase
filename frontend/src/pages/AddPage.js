import * as React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { InputNumber } from 'element-react';
import 'element-theme-default';
import {
    Button,
    LinearProgress,
    FormControl,
    InputLabel,
    FormControlLabel,
    Typography,
    Box,
    FormGroup,
    MenuItem,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import {
    fieldToTextField,
    TextField,
    TextFieldProps,
    Select,
    Switch,
} from 'formik-material-ui';

import {
    Autocomplete,
    ToggleButtonGroup,
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import CurrencyInput from 'react-currency-input-field';
import api from '../api/api';
import store from '../store/store';
import ImageUploading from 'react-images-uploading';


const MyFileUploader = ({ label, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'file' });

    const handleChange = async (files) => {
        if (!files) return;

    };

    return (
        <Box margin={1}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <br />
            <input type="file" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </Box>
    );
};


const AddPage = (props) => {
    const [categories, setcategories] = React.useState([]);
    const [subSelectDisabled, setSubSelectDisabled] = React.useState(true);
    const [subcategories, setsubcategories] = React.useState([]);

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
        console.log(values);
    };

    const handleHighlightChange = (e, option, reason, values) => {
        setSubSelectDisabled(false);
        const categories = store.getState().category;
        if (values.categories.length !== 0 && values.categories.id !== option.id) {
            values.subcategories = [];
        }
        categories.forEach(category => {
            if (category.id === option.id) {
                setsubcategories(category.children);
            }
        });
    };

    React.useEffect(() => {
        api.getCategories()
            .then(() => {
                const res = store.getState().category;
                const parents = res.map((category) => ({ id: category.id, name: category.name, slug: category.slug }));
                const children = res.map((category) => category.children);
                setcategories(parents);
                setsubcategories(children);
            });
    }, []);

    return (
        <Box margin={1}>
            <Typography variant="h3" component="div" gutterBottom>
                {props.title ? props.title : "None title page"}
            </Typography>
            <Formik
                initialValues={{
                    images: null,
                    name: '',
                    description: '',
                    subcategories: [],
                    categories: [],
                    price: 0,
                    stock: 0,
                    available: false,
                    incarousel: false,
                    inbanner: false,
                }}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, submitForm, isSubmitting, touched, errors, setFieldValue }) => (
                    <Form>
                        <Box margin={1}>
                            <ImageUploading
                                name="images"
                                multiple
                                value={values.images}
                                onChange={(imageList, addUpdateIndex) => {console.log(imageList, addUpdateIndex); setFieldValue('images', imageList); console.log(values.images);}}
                                maxNumber={99}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps
                                }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper">
                                        <button
                                            style={isDragging ? { color: "red" } : null}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            Click or Drop here
                                        </button>
                                        &nbsp;
                                        <button onClick={onImageRemoveAll}>Remove all images</button>
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image.data_url} alt="" width="100" />
                                                <div className="image-item__btn-wrapper">
                                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                        </Box>
                        {/* {values.images.length > 0 ? `<div>${values.images.map((image) => image.name)}</div>` : <div>Нет изображений</div>} */}
                        <Box margin={1}>
                            <Field
                                name="name"
                                label="Название"
                                component={TextField}
                                required />
                        </Box>
                        <Box margin={1}>
                            <Field
                                name="description"
                                label="Описание"
                                component={TextField}
                                multiline
                                minRows={4}
                                maxRows={10}
                                required />
                        </Box>
                        <Box margin={1}>
                            <Field
                                name="categories"
                                component={Autocomplete}
                                options={categories}
                                getOptionLabel={(data) => data.name ? data.name : ""}
                                onHighlightChange={(e, option, reason) => handleHighlightChange(e, option, reason, values)}
                                disableClearable
                                autoHighlight
                                required
                                style={{ width: 300 }}
                                renderInput={(params) => {
                                    return (
                                        <MuiTextField
                                            {...params}
                                            error={touched['categories'] && !!errors['categories']}
                                            helperText={touched['categories'] && errors['categories']}
                                            label="Категория"
                                            variant="outlined"
                                        />
                                    );
                                }}
                            />
                        </Box>
                        <Box margin={1}>
                            <Field
                                name="subcategories"
                                multiple
                                required
                                component={Autocomplete}
                                options={subcategories}
                                getOptionLabel={(data) => data.name ? data.name : ""}
                                style={{ width: 300 }}
                                disabled={subSelectDisabled}
                                renderInput={(params) => {
                                    return (
                                        <MuiTextField
                                            {...params}
                                            error={touched['subcategories'] && !!errors['subcategories']}
                                            helperText={touched['subcategories'] && errors['subcategories']}
                                            label="Категория"
                                            variant="outlined"
                                        />
                                    );
                                }}
                            />
                        </Box>
                        <Box margin={1}>
                            <CurrencyInput
                                name="price"
                                placeholder="Введите цену"
                                allowNegativeValue={false}
                                decimalsLimit={1}
                                prefix="$ "
                                value={values.price}
                                onValueChange={handleChange("price")}
                            />
                        </Box>
                        <Box margin={1}>
                            <CurrencyInput
                                name="stock"
                                placeholder="Введите колличество"
                                allowNegativeValue={false}
                                decimalsLimit={1}
                                suffix=" шт."
                                value={values.stock}
                                onValueChange={handleChange("stock")}
                            />
                        </Box>
                        <Box margin={1}>
                            <FormGroup>
                                <FormControlLabel control={<Field component={Switch} type="checkbox" name="available" />} label="Доступно?" />
                                <FormControlLabel control={<Field component={Switch} type="checkbox" name="incarousel" />} label="В карусели?" />
                                <FormControlLabel control={<Field component={Switch} type="checkbox" name="inbanner" />} label="В баннере?" />
                            </FormGroup>
                        </Box>
                        <Box margin={1}>
                            <Button variant="contained" disabled={isSubmitting} onClick={submitForm} >
                                Добавить
                            </Button>
                        </Box>
                        <Box margin={1}>
                            {isSubmitting && <LinearProgress />}
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export { AddPage };