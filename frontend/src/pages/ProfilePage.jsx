import { Paper, Box, TextField, Button } from "@mui/material";
import * as React from "react";
import store from "../store/store";


const ProfilePage = (props) => {
    const [email, setEmail] = React.useState('amir@mail.ru');
    
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
                    <Button variant="contained" color="warning" onClick={() => alert("log out")}>Выйти</Button>
                </Box>
            </Box>
        </Box>  
    );
};

export default ProfilePage;