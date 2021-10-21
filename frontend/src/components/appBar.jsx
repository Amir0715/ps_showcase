import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MyAppBar = (props) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${props.drawerWidth}px)` },
                ml: { sm: `${props.drawerWidth}px` },
                backgroundColor: 'white',
            }}
        >
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' }, color:"black"}}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{color:"black"}}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export { MyAppBar as AppBar };