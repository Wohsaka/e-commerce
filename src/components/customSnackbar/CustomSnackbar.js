import * as React from 'react'
import { Snackbar, Alert, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
const CustomSnackbar = (props) => {
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    props.setOpen(false)
  }

  const snackbarAction = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={closeSnackbar}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  )
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={2000}
      onClose={closeSnackbar}
      action={snackbarAction}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={closeSnackbar} severity='success' sx={{ width: '100%' }}>
        {props.text}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar
