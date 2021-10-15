import { Divider, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { structure } from "../components/routes";
// import { ListItemIcon } from '@mui/material/ListItemIcon';

// Список элементов в панели меню
const ListItems = () => (
    <div>
        <Toolbar />
        <Divider />
        {structure.map(({ title, to }) => (
            <ListItemButton component={Link} to={to} >
                <ListItemText primary={title} />
            </ListItemButton>
        ))}
        {/* <ListItemButton component={Link} to="/" >
            <ListItemIcon>
                 <DashboardIcon /> 
             </ListItemIcon>
            <ListItemText primary="Dashboard" />
         </ListItemButton> */}
    </div>
);

export default ListItems;