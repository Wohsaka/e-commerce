import { Box, CircularProgress, Typography, Backdrop } from '@mui/material'
import DetailedPucharse from '../../detailed-pucharse/DetailedPucharse'
import * as React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import CustomTable from '../../customTable/CustomTable'
import CustomDialog from '../../custom-dialog/CustomDialog'
const axios = require('axios').default

const ShoppingRecord = () => {
  const { email, accessToken } = useSelector((state) => state.user)
  const [errorMsg, setErrorMsg] = React.useState('Error')
  const [openDialog, setOpenDialog] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [recordPages, setRecordPages] = React.useState([])
  const [openBackdrop, setOpenBackdrop] = React.useState(false)
  const [pucharse, setPucharse] = React.useState({})

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const closeBackdrop = () => {
    setOpenBackdrop(false)
  }

  const renderPucharse = (item) => {
    setPucharse(item)
    setOpenBackdrop(true)
    console.log(item)
  }

  const getUserShoppingRecord = async () => {
    const pageSize = 10
    const pages = []
    try {
      const config = {
        headers: {
          authorization: accessToken,
        },
      }
      await axios
        .get(process.env.REACT_APP_API_URL + '/pucharses/' + email, config)
        .then((response) => {
          if (response.data.data.pucharses.length > 0) {
            for (
              let i = 0;
              i < response.data.data.pucharses.length;
              i += pageSize
            ) {
              pages.push(response.data.data.pucharses.slice(i, i + pageSize))
            }
            setRecordPages(pages)
          }
          setLoading(false)
        })
    } catch (error) {
      setLoading(false)
      setErrorMsg(error.message)
      handleOpenDialog()
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
            close={closeBackdrop}
          />
          <CustomTable pages={recordPages} render={renderPucharse} />
        </Box>
      )}
      <CustomDialog
        open={openDialog}
        text={errorMsg}
        onClose={handleCloseDialog}
      />
    </Box>
  )
}

export default ShoppingRecord
