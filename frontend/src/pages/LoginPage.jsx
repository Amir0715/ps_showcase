import * as React from 'react';
import { 
    Avatar, 
    Button, 
    CssBaseline, 
    TextField, 
    FormControlLabel, 
    Checkbox, 
    Link, 
    Paper, 
    Box, 
    Grid, 
    Typography, 
    Alert, 
    AlertTitle 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../api/api';
import store from '../store/store';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Copyright © {" "}
            <Link color="inherit" href="">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const schema = yup.object().shape(
    {
        email: yup.string()
            .email("Проверьте на правильность эл. почту!")
            .required("Поле эл. почты необходимо!"),
        password: yup.string()
            .required("Поле пароля необходимо!"),
    }
);

const theme = createTheme();

const LoginPage = () => {
    const [email, setEmail] = React.useState("");

    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    
    const [rememberMe, setRememberMe] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    const login = () => {
        api.login(email, password)
            .then(() => {
                const token = store.getState().user.token;
                if (token) {
                    if (rememberMe) {
                        localStorage.setItem('token', token);
                    } else {
                        sessionStorage.setItem('token', token);
                    }
                    setRedirect(true);
                } else {
                    
                }
            })
            .catch((e) => {
                console.log(e);
                setError("Невозможно войти с предоставленными учетными данными.");
            });
    };

    React.useEffect(() => {
        login();
    }, []);

    const handleLogin = (event) => {
        schema.validate({email, password})
        .then((valid) => {
            login();
        })
        .catch((err) => {
            setError(err.errors);
        });
    };

    if (redirect) return <Redirect to="/"/>;

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${process.env.REACT_APP_STATIC_URL}images/login_background.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Вход
                        </Typography>
                        <Box
                            component="form"
                            
                            sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Эл. почта"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    name="remember"
                                    checked={rememberMe}
                                    color="primary"
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />}
                                label="Запомнить"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleLogin}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </Button>
                            {error !== "" ? 
                                <Alert severity="error" variant="filled" sx={{ width: '100%'}}>
                                    <AlertTitle>Ошибка</AlertTitle>
                                    {error}
                                </Alert>
                                : null
                            }
                            
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export { LoginPage };