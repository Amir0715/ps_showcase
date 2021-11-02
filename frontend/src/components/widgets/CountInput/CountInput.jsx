import { Box, IconButton, Typography } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { pink } from '@mui/material/colors';

const CountInput = ({ value, onPlus, onSub, ...props }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <IconButton aria-label="remove" onClick={onSub}>
                <RemoveIcon fontSize="large" sx={{ color: pink[500] }} />
            </IconButton>
            <Typography variant="h4" component="div">{value} шт</Typography>
            <IconButton aria-label="add" onClick={onPlus}>
                <AddIcon fontSize="large" color="success" />
            </IconButton>
        </Box>
    );
};

export default CountInput;