import { Container } from '@mui/material'
import React from 'react'
import AddItem from '../../add-item/AddItem'

const AddItemRoute = () => {
  return (
    <Container>
      <AddItem containerStyle={{ marginTop: { desktop: '12vh' } }} />
    </Container>
  )
}

export default AddItemRoute
