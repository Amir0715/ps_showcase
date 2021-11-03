import * as React from 'react';
import { Field, useFormik } from 'formik';
import {
    Button,
    LinearProgress,
    FormControlLabel,
    Typography,
    Box,
    FormGroup,
    TextField,
    Switch,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import {
    Autocomplete,
} from 'formik-material-ui-lab';
import CurrencyInput from 'react-currency-input-field';

import api from '../api/api';
import store from '../store/store';
import ImageUploading from 'react-images-uploading';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import CountInput from '../components/widgets/CountInput/CountInput';
import AutoComplete from '../components/widgets/AutoComplete/AutoComplete';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Это поле должно быть заполнено!'),
    description: Yup.string()
        .min(20, 'Too Short!')
        .required('Это поле должно быть заполнено!'),
    images: Yup.array()
        .min(2, 'Мин 2 изображения!')
        .max(10, 'Макс 2 изображения!')
        .required('Это поле должно быть заполнено!'),
    price: Yup.number()
        .positive('Должно быть больше нуля!')
        .min(1, 'Мин 1')
        .required('Это поле должно быть заполнено!'),
    stock: Yup.number()
        .positive('Должно быть больше нуля!')
        .min(1, 'Мин 1')
        .required('Это поле должно быть заполнено!'),
});

const AddPage = (props) => {
    const [isEditing, setIsEditing] = React.useState(false);  // true - изменение сущ. продукта
    const { id } = useParams();
    const [title, setTitle] = React.useState("Новый продукт");
    const [buttonTitle, setButtonTitle] = React.useState("Добавить");

    const handleSubmit = (values, { setSubmitting }) => {
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        // }, 400);
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            images: [],
            name: '',
            description: '',
            subcategories: [],
            category: {},
            price: 0,
            stock: 0,
            available: false,
            incarousel: false,
            inbanner: false,
        },
        onSubmit: handleSubmit,
        validationSchema: SignupSchema
    });

    React.useEffect(() => {
        if (id !== null && id !== undefined) {
            setTitle("Загрузка...");
            api.getProduct(id)
                .then(() => {
                    setIsEditing(true);
                    const product = store.getState().products.current;
                    console.log(product);
                    setButtonTitle("Сохранить");
                    // АВТОЗАПОЛНЕНИЕ ФОРМЫ ДАННЫМИ
                    formik.setFieldValue("name", product.name);
                    formik.setFieldValue("description", product.description);
                    formik.setFieldValue("price", product.price);
                    formik.setFieldValue("stock", product.stock);
                    formik.setFieldValue("available", product.available);
                    formik.setFieldValue("incarousel", product.incarousel);
                    formik.setFieldValue("inbanner", product.inbanner);
                    formik.setFieldValue("images", product.images);
                    setTitle(product.name);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }, []);

    const handleImageChangeCover = (event, id) => {
        event.preventDefault();
        const imgs = formik.values.images.map((img) => {
            if (img.id === id) {
                // Находим и меняем у нужного элемента с индексом id isCover на event.target.checked
                return { ...img, is_cover: event.target.checked };
            }
            // А у остальных элементов сбрасываем
            return { ...img, is_cover: false };
        });
        formik.setFieldValue('images', imgs);
    };

    return (
        <Box margin={1}>
            <Typography variant="h3" component={Box} gutterBottom>
                {title}
            </Typography>
            <form>
                <Box margin={1}>
                    <ImageUploading
                        name="images"
                        multiple
                        value={formik.values.images}
                        onChange={(imageList, addUpdateIndex) => {
                            const imgs = imageList.map((img, index) => ({ id: index, image: img.dataURL, file: img.file, is_cover: false }));
                            formik.setFieldValue('images', imgs);
                        }}
                        maxNumber={99}
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
                            <Box margin={1}>
                                <Button
                                    variant="contained"
                                    sx={isDragging ? { color: "red" } : null}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Нажмите или перетащите сюда
                                </Button>
                                &nbsp;
                                <Button variant="contained" onClick={onImageRemoveAll}>Очистить</Button>
                                {imageList.map((image, index) => (
                                    <Box key={index} margin={1}>
                                        <img src={image.image} alt="" width="600" />
                                        <Box margin={1}>
                                            <Button variant="contained" onClick={() => onImageUpdate(index)}>Заменить</Button>
                                            <Button variant="contained" onClick={() => onImageRemove(index)}>Удалить</Button>
                                            <FormControlLabel
                                                label="Обложка?"
                                                control={
                                                    <Switch
                                                        name="isCover"
                                                        checked={image.is_cover}
                                                        onChange={(event) => { handleImageChangeCover(event, image.id); }}
                                                    />}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </ImageUploading>
                    {formik.errors.images && formik.touched.images ? (
                        <div>{formik.errors.images}</div>
                    ) : null}
                </Box>
                <Box margin={1}>
                    <TextField
                        name="name"
                        label="Название"
                        required
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Box>
                <Box margin={1}>
                    <TextField
                        name="description"
                        label="Описание"
                        multiline
                        fullWidth
                        required
                        minRows={4}
                        maxRows={10}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Box>
                <Box margin={1}>
                    <AutoComplete
                        formik={formik}
                        
                    />
                </Box>
                {/* <Box margin={1}>
                    <Field
                        name="categories"
                        component={Autocomplete}
                        options={categories}
                        getOptionLabel={(data) => data.name ? data.name : ""}
                        onHighlightChange={(e, option, reason) => handleHighlightChange(e, option, reason, formik.values)}
                        disableClearable
                        autoHighlight
                        required
                        style={{ width: 300 }}
                        renderInput={(params) => {
                            return (
                                <MuiTextField
                                    {...params}
                                    error={formik.touched['categories'] && !!formik.errors['categories']}
                                    helperText={formik.touched['categories'] && formik.errors['categories']}
                                    label="Категория"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                    {formik.errors.categories && formik.touched.categories ? (
                        <div>{formik.errors.categories}</div>
                    ) : null}
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
                                    error={formik.touched['subcategories'] && !!formik.errors['subcategories']}
                                    helperText={formik.touched['subcategories'] && formik.errors['subcategories']}
                                    label="Категория"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                    {formik.errors.subcategories && formik.touched.subcategories ? (
                        <div>{formik.errors.subcategories}</div>
                    ) : null}
                </Box> */}
                {/* <Box margin={1}>
                    <CurrencyInput
                        name="price"
                        placeholder="Введите цену"
                        inputType="number"
                        allowNegativeValue={false}
                        decimalsLimit={1}
                        prefix="$ "
                        value={formik.values.price}
                        onChangeEvent={(event, maskedvalue, floatvalue) => {formik.setFieldValue("price", floatvalue);}}
                    />
                    {formik.errors.price && formik.touched.price ? (
                        <div>{formik.errors.price}</div>
                    ) : null}
                </Box> */}
                <Box margin={1}>
                    <CountInput
                        name="stock"
                        value={formik.values.stock}
                        onPlus={e => { formik.setFieldValue('stock', formik.values.stock + 1); }}
                        onSub={e => { formik.setFieldValue('stock', formik.values.stock - 1 > 0 ? formik.values.stock - 1 : formik.values.stock); }}
                        onChange={(event) => { console.log(event); formik.setFieldValue("stock", event.target.stock); }}
                    />
                </Box>
                <Box margin={1}>
                    <FormGroup>
                        <FormControlLabel
                            label="Доступно?"
                            control={
                                <Switch
                                    name="available"
                                    checked={formik.values.available}
                                    onChange={(event) => { formik.setFieldValue("available", event.target.checked); }}
                                />}
                        />
                        <FormControlLabel
                            label="В карусели?"
                            control={
                                <Switch
                                    name="incarousel"
                                    checked={formik.values.incarousel}
                                    onChange={(event) => { formik.setFieldValue("incarousel", event.target.checked); }}
                                />}
                        />
                        <FormControlLabel
                            label="В баннере?"
                            control={
                                <Switch
                                    name="inbanner"
                                    checked={formik.values.inbanner}
                                    onChange={(event) => { formik.setFieldValue("inbanner", event.target.checked); }}
                                />}
                        />
                    </FormGroup>
                </Box>
                <Box margin={1}>
                    <Button variant="contained" disabled={formik.isSubmitting} onClick={formik.handleSubmit}>
                        {buttonTitle}
                    </Button>
                </Box>
                <Box margin={1}>
                    {formik.isSubmitting && <LinearProgress />}
                </Box>
            </form>
        </Box>
    );
};

export { AddPage };