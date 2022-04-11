import logo from './logo.svg';
import { ReactComponent as Logo } from './assets/test_image.svg';
import shoppingCartButton from './components/shoppingCartButton';
//import { shoppingCart } from './src/components/';
import './App.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//import Stack from '@mui/material/Stack';
      //<Logo height="400px" width="100px" />
function App() {
  return (
    <div className="App">
      <svg 
      <Box component="span" sx={{ backgroundColor: '#282c34', height: '400px', width: '400px', p: 2 }}>
        <Button variant="contained" startIcon={<ShoppingCartIcon />}>
          Cart
        </Button>
      </Box>
      <header className="App-header">
        <p>
          Hello World! | (703) 912-3164
        </p>
      </header>
    </div>
  );
}

export default App;
