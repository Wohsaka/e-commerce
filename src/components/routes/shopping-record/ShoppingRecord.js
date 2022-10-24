import { Box, CircularProgress, Typography, Backdrop } from '@mui/material'
import DetailedPucharse from '../../detailed-pucharse/DetailedPucharse'
import * as React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import CustomTable from '../../customTable/CustomTable'
const axios = require('axios').default

const ShoppingRecord = () => {
  const email = useSelector((state) => state.user.email)
  const [loading, setLoading] = React.useState(true)
  const [recordPages, setRecordPages] = React.useState([])
  const [openBackdrop, setOpenBackdrop] = React.useState(false)
  const [pucharse, setPucharse] = React.useState({})

  const closeBackdrop = () => {
    setOpenBackdrop(false)
  }

  const renderPucharse = (item) => {
    setPucharse(item)
    setOpenBackdrop(true)
  }

  const getUserShoppingRecord = async () => {
    const pageSize = 10
    const pages = []
    try {
      await axios
        .get('http://localhost:8000/api/history/' + email)
        .then((response) => {
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i += pageSize) {
              pages.push(response.data.slice(i, i + pageSize))
            }
            setRecordPages(pages)
          }
          setLoading(false)
        })
    } catch (error) {
      setLoading(false)
      alert('Error in database connection')
      console.log(error)
    }
  }

  React.useEffect(() => {
    getUserShoppingRecord()
  }, [])

  return (
    <Box className='shopping-record-container'>
      <Box className='shopping-record-title-container'>
        <Typography variant='h5'>Shopping History</Typography>
      </Box>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='warning' />
        </Backdrop>
      ) : (
        <Box className='shopping-record-table-container'>
          <DetailedPucharse
            open={openBackdrop}
            item={pucharse}
            pucharse={pucharse.pucharse}
            close={closeBackdrop}
          />
          <CustomTable pages={recordPages} render={renderPucharse} />
        </Box>
      )}
    </Box>
  )
}

export default ShoppingRecord
