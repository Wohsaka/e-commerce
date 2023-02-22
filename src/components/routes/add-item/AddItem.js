import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import './style.css'
import isUrl from 'is-url'
import { useSelector } from 'react-redux'
const axios = require('axios').default

const categories = [
  {
    value: 'select',
    label: 'Select',
  },
  {
    value: 'food',
    label: 'Food',
  },
  {
    value: 'toys',
    label: 'Toys',
  },
  {
    value: 'beds',
    label: 'Beds',
  },
  {
    value: 'clothing',
    label: 'Clothing',
  },
]

const AddItem = () => {
  const [itemData, setItemData] = React.useState({
    name: '',
    price: 0.0,
    category: categories[0].value,
    id: '',
    img: '',
    description: '',
  })
  const accessToken = useSelector((state) => state.user.accessToken)

  const handleChangeItemData = (e) => {
    setItemData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddItem = async () => {
    let blank = false
    Object.values(itemData).forEach((data) => {
      //Checks for empty fields
      if (data === '' || data === 0) {
        blank = true
      }
    })
    if (blank) {
      alert('Item data must not have blank fields!')
      return
    }
    try {
      const config = {
        headers: {
          authorization: accessToken,
        },
      }
      await axios.post(
        process.env.REACT_APP_API_URL + '/items',
        itemData,
        config
      )
      setItemData({
        name: '',
        price: 0.0,
        category: categories[0].value,
        id: '',
        img: '',
        description: '',
      })
      alert('Item added nicely :)!')
    } catch (error) {
      console.log(error)
      alert('Error adding item')
    }
  }

  return (
    <Container className='add-item-container'>
      <Typography variant='h5'>Item info</Typography>
      <TextField
        error={itemData.name === '' ? true : false}
        name='name'
        label='Name'
        variant='standard'
        margin='dense'
        value={itemData.name}
        onChange={handleChangeItemData}
      />
      <Container className='add-item-container-row'>
        <TextField
          error={itemData.price === 0 || itemData.price === '' ? true : false}
          type='number'
          name='price'
          label='Price'
          variant='standard'
          margin='dense'
          value={itemData.price}
          onChange={handleChangeItemData}
          sx={{ width: '45%' }}
        />
        <TextField
          error={itemData.category === 'select' ? true : false}
          select
          name='category'
          label='Category'
          variant='standard'
          margin='dense'
          value={itemData.category}
          onChange={handleChangeItemData}
          sx={{ width: '45%' }}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Container>
      <TextField
        error={itemData.id === '' ? true : false}
        name='id'
        label='Id'
        variant='standard'
        margin='dense'
        value={itemData.id}
        onChange={handleChangeItemData}
      />
      <TextField
        error={!isUrl(itemData.img)}
        name='img'
        label='Image link'
        variant='standard'
        margin='dense'
        value={itemData.img}
        onChange={handleChangeItemData}
      />
      <TextField
        error={itemData.description === '' ? true : false}
        name='description'
        label='Description'
        multiline
        maxRows={4}
        margin='normal'
        value={itemData.description}
        onChange={handleChangeItemData}
      />
      <Button
        variant='contained'
        onClick={handleAddItem}
        className='add-item-add-item-button'
      >
        Add item
      </Button>
    </Container>
  )
}

export default AddItem
