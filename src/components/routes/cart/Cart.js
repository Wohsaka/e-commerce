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
  Backdrop,
  CircularProgress,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './style.css'
import CustomSnackbar from '../../customSnackbar/CustomSnackbar'
import { useDispatch, useSelector } from 'react-redux'
import {
  addOne,
  minusOne,
  resetCart,
} from '../../../redux/slices/cart/cartSlice'
const axios = require('axios').default

const Cart = () => {
  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.cart)
  const { isLogged, email, accessToken } = useSelector((state) => state.user)
  const [openBackdrop, setOpenBackdrop] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  const recordPucharse = async () => {
    if (isLogged) {
      setOpenBackdrop(true)
      const pucharse = {
        email: email,
        total: total,
        items: items,
      }
      //Store pucharse in database
      try {
        const config = {
          headers: {
            authorization: accessToken,
          },
        }
        await axios.post(process.API_URL + '/pucharses', pucharse, config)
        dispatch(resetCart())
        setOpenBackdrop(false)
        setOpenSnackbar(true)
      } catch (error) {
        dispatch(resetCart())
        setOpenBackdrop(false)
        alert(error.message)
        console.log(error)
      }
    } else {
      alert('You must be logged in to acces this feature!')
    }
  }

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
            onClick={recordPucharse}
          >
            Confirm payment <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color='warning' />
      </Backdrop>
      <CustomSnackbar
        open={openSnackbar}
        text='Satisfactory purchase!'
        setOpen={setOpenSnackbar}
      />
    </Box>
  )
}

export default Cart
