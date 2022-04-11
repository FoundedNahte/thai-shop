import * as React from 'react';
import Button from '@mui/material/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';

export function shoppingCartButton() {
    return (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<ShoppingCartIcon />}>
            Cart
          </Button>
        </Stack>
    );
}

export default shoppingCartButton;
