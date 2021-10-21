import { Divider, ListItemButton, ListItemText, Toolbar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { structure } from "../components/routes";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navItem: {
        display: "block",
        marginTop: 1,
        marginLeft: 1,
    },
});


// Список элементов в панели меню
const ListItems = () => {
    const classes = useStyles();
    return (
        <div>
            <Toolbar />
            <Divider />
            {structure.map(({title, to}, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        p:1,
                    }}
                >
                    <ListItemButton
                        component={Link}
                        to={to}
                        className={classes.navItem}
                    >
                        <ListItemText primary={title} />
                    </ListItemButton>
                </Box>
            ))}
        </div>
    );
};

export default ListItems;