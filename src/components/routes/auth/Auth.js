import React from 'react'
import './style.css'
import {
  Box,
  TextField,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { userLoggedIn } from '../../../redux/slices/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const axios = require('axios').default

const Auth = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [signOrLog, setSignOrLog] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  let navigate = useNavigate()

  //Redux
  const dispatch = useDispatch()

  const signUp = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + '/users',
        {
          email,
          password,
        }
      )
      if (!data.success) {
        setLoading(false)
        alert(data.message)
        console.log(data.message)
        return
      }
      dispatch(userLoggedIn({ email, accessToken: data.data.accessToken }))
      navigate('/Shop', { replace: true })
      setEmail('')
      setPassword('')
      setLoading(false)
    } catch (error) {
      console.log(error)
      alert(error.message)
      setLoading(false)
    }
  }

  const login = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + '/users/login',
        {
          email,
          password,
        }
      )
      if (!data.success) {
        setLoading(false)
        alert(data.message)
        console.log(data.message)
        return
      }
      dispatch(userLoggedIn({ email, accessToken: data.data.accessToken }))
      navigate('/Shop', { replace: true })
      setEmail('')
      setPassword('')
      setLoading(false)
    } catch (error) {
      console.log(error)
      alert(error.message)
      setLoading(false)
    }
  }

  const switchSignOrLog = () => {
    setSignOrLog(!signOrLog)
    setEmail('')
    setPassword('')
  }

  return (
    <Box className='auth-route'>
      <Backdrop
        sx={{ color: '#e37b64', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Box className='auth-container'>
        <Box className='auth-container-title'>
          <Typography variant='h6' sx={{ color: '#e37b64' }}>
            {signOrLog ? 'Sign up' : 'Login'}
          </Typography>
        </Box>
        <Box className='inputs-container'>
          <TextField
            label='email'
            variant='filled'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            label='password'
            variant='filled'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                signOrLog ? signUp() : login()
              }
            }}
          ></TextField>
        </Box>
        <Button
          size='large'
          className='auth-sign-up-button'
          onClick={signOrLog ? signUp : login}
        >
          {signOrLog ? 'Sign up' : 'Login'}
        </Button>
        <Box className='auth-switch-container'>
          <Typography variant='body2'>
            {signOrLog ? 'Already have an account?' : "Don't have an account?"}
          </Typography>
          <Button
            size='small'
            onClick={switchSignOrLog}
            sx={{ color: '#e37b64' }}
          >
            {signOrLog ? 'Login' : 'Sign up'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Auth
