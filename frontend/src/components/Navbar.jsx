import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#DED9D9",
    },
    secondary: {
      main: "#000000",
    },
  },
});

const theme2 = createTheme({
  palette: {
    primary: {
      main: "#B6B0B0",
    },
    secondary: {
      main: "#000000",
    }
  },
});

export default function Navbar() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar sx={{ height: 50 }}>
            <Toolbar>
              <Typography variant="h6" component="div" gutterBottom={true} sx={{ flexGrow: 1}}>
                Phone Number : (703) 912-3164 
              </Typography>
              <IconButton aria-label="signin" color="inherit" size="large">
                <AccountCircleIcon />
              </IconButton>
              <Button variant="contained" endIcon={<ShoppingCartIcon />} size="large" style={{maxWidth: '50px', maxHeight: "30px", minWidth: "30px", minHeight: "30px", top: "5px"}}>
                CART
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
      <ThemeProvider theme={theme2}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar sx={{ height: 105, top: 50 }}>
            <Toolbar>
              <Button>
                THAI SHOP
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </div>
  );
}
