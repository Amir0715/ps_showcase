import { Paper, Box, TextField, Button } from "@mui/material";
import * as React from "react";
import api from "../api/api";
import store from "../store/store";


const ProfilePage = (props) => {
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        api.getMe().then((data) => setEmail(data.email));
    }, []);

    const logout = (e) => {
        api.logout();
    };
    
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