import './style.css'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: '0.1em',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const ProductCard = (props) => {
  const [quantity, setQuantity] = useState(1)
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const increaseQuantity = () => {
    setQuantity((prevState) => (prevState += 1))
  }

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return
    } else {
      setQuantity((prevState) => (prevState -= 1))
    }
  }

  return (
    <Card
      className='product-card'
      variant='elevation'
      sx={{ width: { tablet: '200px', mobile: '250px' }, margin: '1em 0' }}
    >
      <CardMedia
        component='img'
        sx={{
          width: { tablet: '150px', mobile: '185px' },
          height: { tablet: '150px', mobile: '185px' },
          marginLeft: { tablet: '25px', mobile: '32px' },
        }}
        image={props.productImg}
        alt={props.productName}
      />
      <CardContent sx={{ paddingBottom: 0, paddingTop: '8px' }}>
        <Typography gutterBottom variant='h6' component='div'>
          {props.productPrice}$
        </Typography>
        <Typography
          variant='h7'
          color='text.secondary'
          sx={{ display: 'block' }}
        >
          {props.productName}
        </Typography>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Typography variant='body1'>{props.productDescription}</Typography>
        </Collapse>
        <Typography
          variant='button'
          sx={{
            marginLeft: { tablet: '3.5em', mobile: '4.5em' },
            fontSize: '0.8em',
            color: '#e37b64',
          }}
        >
          See More
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardContent>
      <CardActions
        sx={{
          '&.MuiCardActions-root': {
            justifyContent: 'flex-end',
          },
        }}
      >
        <Button
          size='small'
          onClick={decreaseQuantity}
          className='card-quantity-button'
        >
          -
        </Button>
        <Typography className='card-quantity-to-add'>{quantity}</Typography>
        <Button
          size='small'
          onClick={increaseQuantity}
          className='card-quantity-button'
        >
          +
        </Button>
        <Button
          className='card-add-button'
          size='medium'
          onClick={() =>
            props.onAddToCart({
              productImg: props.productImg,
              productName: props.productName,
              productPrice: props.productPrice,
              quantity: quantity,
            })
          }
        >
          Add
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
