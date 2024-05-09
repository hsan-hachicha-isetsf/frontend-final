import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
const Menuclient = () => {
    const {cartItems,cartTotalQuantity} = useSelector((state) => state.storecart);
    const navigate = useNavigate()
  return (
    <>
<Navbar bg="info" data-bs-theme="info">
<Container>
<Navbar.Brand href="#home"><strong>Espace Client</strong></Navbar.Brand>
<IconButton size="large"
edge="end"
aria-label="account of current user"
aria-haspopup="true"
color="dark"
onClick={()=>{navigate("/cart")}}
>
<ShoppingCartIcon sx={{ fontSize: 40 }}/>
<Badge badgeContent={cartItems.length}
color="success">
</Badge>
</IconButton>
</Container>
      </Navbar>
      </>
  )
}

export default Menuclient
