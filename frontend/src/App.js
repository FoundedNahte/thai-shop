import { ReactComponent as Logo } from './assets/test_image.svg';
import './App.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Home from './pages/Home';
/*
function App() {
  return (
    <div className="App">
      <Logo height="200px" width="100px" />
      <Box component="span" sx={{ backgroundColor: '#282c34', height: '100px', width: '100px', p: 2 }}>
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
*/

const App = () => {
  return <Home/>;
};

export default App;
