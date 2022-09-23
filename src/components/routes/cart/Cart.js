import React, { useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ImageListItem,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { addOne, minusOne } from '../../../redux/slices/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const total = useSelector((state) => state.cart.total)

  useEffect(() => {}, [])

  return (
    <Box className='cart-container'>
      <Box className='cart-back-container'>
        <Typography variant='h6' sx={{ color: 'gray' }}>
          My cart
        </Typography>
      </Box>
      <Divider />
      <Box className='cart-items-list-container'>
        {Object.keys(items).length !== 0 ? (
          <List>
            {Object.keys(items).map((key) => {
              return (
                <ListItem key={key} divider={true}>
                  <ImageListItem>
                    <img
                      src={items[key].img}
                      alt={key}
                      className='cart-item-img'
                    />
                  </ImageListItem>
                  <Box className='cart-subtotal-container'>
                    <Typography
                      variant='subtitle1'
                      sx={{ fontWeight: 'bold' }}
                      noWrap={true}
                    >
                      {items[key].name}
                    </Typography>
                    <Typography variant='body2'>
                      ${items[key].price} each one
                    </Typography>
                    <Typography variant='body1' className='cart-item-subtotal'>
                      Subtotal ${items[key].subTotal}
                    </Typography>
                  </Box>
                  <Box className='cart-quantity-container'>
                    <ListItemButton
                      onClick={() => dispatch(addOne(items[key]))}
                    >
                      +
                    </ListItemButton>
                    <Typography className='cart-quantity' variant='body1'>
                      {items[key].amount}
                    </Typography>
                    <ListItemButton
                      onClick={() => dispatch(minusOne(items[key]))}
                    >
                      -
                    </ListItemButton>
                  </Box>
                </ListItem>
              )
            })}
          </List>
        ) : (
          <div className='cart-empty-container'>
            <Typography variant='h4' className='cart-empty'>
              Your cart is empty
            </Typography>
          </div>
        )}
      </Box>
      <Box className='cart-confirm-payment-container'>
        <Typography variant='body2' className='cart-total-label'>
          Total
        </Typography>
        <Typography variant='h6' className='cart-total'>
          ${total}
        </Typography>
        <Box className='cart-confirm-payment-button-container'>
          <Button
            size='large'
            className='cart-confirm-payment-button'
            onClick={() =>
              alert("We're sorry, this feature is unavailable right now.")
            }
          >
            Confirm payment <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Cart
