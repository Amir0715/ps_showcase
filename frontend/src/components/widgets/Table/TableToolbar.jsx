import { Add, Delete, FilterList } from "@mui/icons-material";
import { alpha, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link, useRouteMatch } from "react-router-dom";
import PropTypes from 'prop-types';

// Загаловок с кнопками
const TableToolbar = ({ numSelected, tabletitle }) => {
    const { path, url } = useRouteMatch();

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {numSelected > 0 ? (`${numSelected} selected`) : ( tabletitle )}
            </Typography>

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (
                <Box sx={{ display: "flex" }}>
                    <Tooltip title="Фильтры">
                        <IconButton>
                            <FilterList />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Добавить">
                        <IconButton component={Link} to={`${url}/add`}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    tabletitle: PropTypes.string.isRequired,
}; 

export { TableToolbar };