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
  const [keys, setKeys] = React.useState([])

  React.useEffect(() => {
    if (props.item.pucharse !== undefined && props.item.pucharse !== null) {
      setKeys(Object.keys(props.item.pucharse))
    }
  }, [props.item.pucharse])

  if (props.pucharse !== undefined && props.pucharse !== null) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
        onClick={props.close}
      >
        <Box className='backdrop-list-container'>
          <List sx={{ maxHeight: '80vh', overflow: 'auto' }}>
            {keys.length > 0
              ? keys.map((key) => {
                  return (
                    <ListItem key={props.item.pucharse[key].name} divider>
                      <ListItemIcon>
                        <img
                          src={props.item.pucharse[key].img}
                          alt={props.item.pucharse[key].name}
                          className='detailed-pucharse-item-img'
                        />
                      </ListItemIcon>
                      <ListItemText
                        className='backdrop-list-item-text'
                        primary={`${props.item.pucharse[key].name} x ${props.item.pucharse[key].amount}`}
                        secondary={`${props.item.pucharse[key].price}$ Each - Subtotal ${props.item.pucharse[key].subTotal}$`}
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
