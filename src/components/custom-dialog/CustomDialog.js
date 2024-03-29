import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import './style.css'

export default function CustomDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {props.title ? props.title : 'Info'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={props.onClose}
            autoFocus
            className='custom-dialog-button'
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
