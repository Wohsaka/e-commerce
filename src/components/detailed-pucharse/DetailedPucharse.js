import {
  Backdrop,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import * as React from 'react'
import './style.css'

const DetailedPucharse = (props) => {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    console.log(props.item)
    if (props.item.items !== undefined && props.item.items !== null) {
      setItems(Object.values(props.item.items))
    }
  }, [props.item])

  if (props.item.items !== undefined && props.item.items !== null) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
        onClick={props.close}
      >
        <Box className='backdrop-list-container'>
          <List sx={{ maxHeight: '80vh', overflow: 'auto' }}>
            {items.length > 0
              ? items.map((item) => {
                  return (
                    <ListItem key={item.name} divider>
                      <ListItemIcon>
                        <img
                          src={item.img}
                          alt={item.name}
                          className='detailed-pucharse-item-img'
                        />
                      </ListItemIcon>
                      <ListItemText
                        className='backdrop-list-item-text'
                        primary={`${item.name} x ${item.amount}`}
                        secondary={`${item.price}$ Each - Subtotal ${item.subTotal}$`}
                      />
                    </ListItem>
                  )
                })
              : null}
            <ListItem>
              <ListItemText
                className='backdrop-list-total-text'
                primary={`Total ${props.item.total}$`}
              />
            </ListItem>
          </List>
        </Box>
      </Backdrop>
    )
  }
}

export default DetailedPucharse
