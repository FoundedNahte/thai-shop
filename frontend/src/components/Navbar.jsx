import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from '@mui/material/Toolbar'
const Navbar = () => {
    return (
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
              <IconButton aria-label="home">
                <HomeIcon />
              </IconButton>
              <Button variant="contained" startIcon={<ShoppingCartIcon />}>
                Cart
              </Button>
            </Toolbar>
        </AppBar>
      </Box>
    );
};

export default Navbar;