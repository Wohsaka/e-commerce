import './style.css'
import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      desktop: 1280,
    },
  },
})

const categories = ['All', 'Food', 'Toys', 'Beds', 'Clothing']

const Filter = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <ThemeProvider theme={theme}>
      <div className='filter-container'>
        <div className='search-bar-container'>
          <TextField
            className='filter-search-bar'
            label='Search'
            color='secondary'
            focused
            sx={{
              '& .MuiOutlinedInput-input': {
                padding: '0.5em 1em',
                bgcolor: '#ffff',
              },
            }}
            value={props.searcText}
            onChange={(e) => props.setSearchText(e.target.value)}
          ></TextField>
          <Button className='search-button' size='small' onClick={props.search}>
            Search
          </Button>
        </div>
        <div className='show-categories'>
          <Button
            size='small'
            sx={{ display: { tablet: 'none' }, color: '#e37b64' }}
            onClick={handleDrawerToggle}
          >
            Categories
          </Button>
          <Typography
            variant='h7'
            sx={{
              display: { mobile: 'none', tablet: 'block' },
              color: '#e37b64',
            }}
          >
            Categories
          </Typography>
        </div>
        <Box
          component='nav'
          sx={{ display: { mobile: 'none', tablet: 'block' } }}
        >
          <List sx={{ backgroundColor: '#fffff2', height: '100vh' }}>
            {categories.map((category) => (
              <ListItem key={category}>
                <ListItemButton
                  onClick={() => props.filter(category)}
                  id={category}
                  className={
                    category === 'All'
                      ? 'filter-category-button-active'
                      : 'filter-category-button'
                  }
                >
                  <ListItemText primary={category} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box component='nav'>
          <Drawer
            anchor='top'
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
                width: '100vw',
                bgcolor: '#fffff2',
              },
            }}
          >
            <Box
              onClick={handleDrawerToggle}
              sx={{ textAlign: 'center', display: {} }}
            >
              <Typography variant='h5' className='drawer-title'>
                Categories
              </Typography>
              <Divider />
              <List>
                {categories.map((category) => (
                  <ListItem key={category}>
                    <ListItemButton
                      sx={{ textAlign: 'center', color: '#e37b64' }}
                      onClick={() => props.filter(category)}
                    >
                      <ListItemText primary={category} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default Filter
