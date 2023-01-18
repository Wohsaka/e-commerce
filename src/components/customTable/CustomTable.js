import * as React from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Box,
  Typography,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const CustomTable = (props) => {
  const [page, setPage] = React.useState(0)
  const [backDisable, setBackDiable] = React.useState(true)
  const [nextDisable, setNextDiable] = React.useState(false)

  const checkPage = () => {
    //Checks current page to disable next or back buttons when needed
    if (props.pages.length === 0) {
      console.log(props.pages.length)
      setNextDiable(true)
      setBackDiable(true)
      return
    }
    if (page + 1 === props.pages.length) {
      setNextDiable(true)
    } else {
      setNextDiable(false)
    }
    if (page === 0) {
      setBackDiable(true)
    } else {
      setBackDiable(false)
    }
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }
  const handlePreviousPage = () => {
    setPage(page - 1)
  }

  React.useEffect(() => {
    checkPage()
  }, [page])

  return (
    <Box>
      <Table component={Paper} className='shopping-record-table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pages.length > 0 ? (
            props.pages[page].map((item) => {
              let [date, time] = item.date.split('T')
              time = time.split('.')[0]
              return (
                <TableRow key={item.id} onClick={() => props.render(item)}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{`Pucharse made in ${date} at ${time}`}</TableCell>
                  <TableCell>
                    <Typography sx={{ color: '#e37b64' }}>
                      {item.total}$
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Box className='empty-record-container'>
                  <Typography variant='h6' fontWeight='bold'>
                    You haven't bought anything yet
                  </Typography>
                </Box>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box className='page-control-container'>
        <IconButton
          disabled={backDisable}
          aria-label='back'
          onClick={handlePreviousPage}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box className='actual-page-container'>
          <Typography>{page + 1}</Typography>
        </Box>
        <IconButton
          disabled={nextDisable}
          aria-label='forward'
          onClick={handleNextPage}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CustomTable
