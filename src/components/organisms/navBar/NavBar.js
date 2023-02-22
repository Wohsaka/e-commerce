import './style.css'
import logo from '../../../assets/images/logo.png'
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLoggedOut } from '../../../redux/slices/user/userSlice'
import { resetCart } from '../../../redux/slices/cart/cartSlice'

const NavBar = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [lastItem, setLastItem] = React.useState('')
  const { isLogged, role } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const drawerWidth = 240
  const navItems = [
    'Shop',
    'About',
    'Cart',
    isLogged ? 'Log out' : 'Log in/Sign Up',
  ]
  isLogged && navItems.push('Shopping History')
  if (role === 'a') {
    navItems.push('Add Item')
    navItems.push('Modify Items')
  }

  const handleLogOut = () => {
    dispatch(resetCart())
    dispatch(userLoggedOut())
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigate = (item) => {
    if (lastItem !== '') {
      const lastClicked = document.getElementById(lastItem)
      if (lastClicked !== null) {
        lastClicked.classList.remove('nav-bar-button-active')
      }
    }
    const buttonClicked = document.getElementById(item)
    buttonClicked.classList.add('nav-bar-button-active')
    setLastItem(item)
    navigate('/' + item, { replace: true })
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <div className='logo'>
        <Button variant='text' onClick={() => navigate('/', { replace: true })}>
          <img src={logo} alt='logo' width={130} height={45} />
        </Button>
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center', color: '#e37b64' }}
              onClick={
                item === 'Log out' ? handleLogOut : () => handleNavigate(item)
              }
              id={item}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav' sx={{ bgcolor: '#fffefe' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { tablet: 'none' } }}
          >
            <MenuIcon sx={{ color: '#e37b64' }} />
          </IconButton>
          <div className='logo-container'>
            <Button
              variant='text'
              onClick={() => navigate('/', { replace: true })}
            >
              <img src={logo} alt='logo' width={130} height={45} />
            </Button>
          </div>
          <Box
            className='nav-bar'
            sx={{
              display: { mobile: 'none', tablet: 'block' },
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                className='nav-bar-button'
                onClick={
                  item === 'Log out' ? handleLogOut : () => handleNavigate(item)
                }
                id={item}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { mobile: 'block', tablet: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#fffefe',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default NavBar
