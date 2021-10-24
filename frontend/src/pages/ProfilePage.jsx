import { Paper, Box, TextField, Button } from "@mui/material";
import * as React from "react";
import { Redirect } from "react-router-dom";
import api from "../api/api";
import store from "../store/store";


const ProfilePage = (props) => {
    const [email, setEmail] = React.useState('');
    const [redirected, setRedirected] = React.useState(false);
    React.useEffect(() => {
        api.getMe().then(() => {
            setEmail(store.getState().user.email);
            console.log(store.getState().user.email); 
        });
    }, []);

    const logout = (e) => {
        api.logout().then(() => {
            setRedirected(true);
        });
    };
    
    if(redirected) return <Redirect to="/login"/>;

    return (
        <Box component={Paper} padding={1}>
            <Box margin={1}>
                <TextField id="email" label="Email" variant="outlined" value={email} />
            </Box>
            <Box margin={1}>
                <Box marginBottom={1}>
                    <Button variant="contained" onClick={() => alert("save clicked")}>Сохранить изменения</Button>
                </Box>
                <Box>
                    <Button variant="contained" color="warning" onClick={logout}>Выйти</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;