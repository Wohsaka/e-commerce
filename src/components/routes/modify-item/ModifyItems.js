import { Container, Modal, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { CircularProgress } from '@mui/material'
import React from 'react'
import './style.css'
import ItemsTable from '../../items-table/ItemsTable'
import AddItem from '../../add-item/AddItem'
const axios = require('axios').default

const ModifyItems = () => {
  const [items, setItems] = React.useState([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [itemToModify, setItemToModify] = React.useState({})

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleItemClick = (item) => {
    setItemToModify(item)
    handleOpen()
  }

  const getItems = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/items')
    const data = await response.data.data
    setItems(data)
  }

  React.useEffect(() => {
    getItems()
  }, [])

  return (
    <div className='modify-items-container'>
      <ItemsTable items={items} onItemClick={handleItemClick} />
      <Modal open={isModalOpen} onClose={handleClose}>
        <AddItem
          item={itemToModify}
          isPutRequest={true}
          onUpdate={getItems}
          containerStlye={{ marginTop: { desktop: '5vh' } }}
        />
      </Modal>
    </div>
  )
}

export default ModifyItems
