import React from 'react'
import './style.css'
import { Box, TextField, Typography, Button } from '@mui/material'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { userLoggedIn } from '../../../redux/slices/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const firebaseConfig = {
  apiKey: 'AIzaSyD3mMTAK_FPQSvUW8SQ9sgVUchhl60QWEI',
  authDomain: 'e-commerce-95ec0.firebaseapp.com',
  projectId: 'e-commerce-95ec0',
  storageBucket: 'e-commerce-95ec0.appspot.com',
  messagingSenderId: '423491911419',
  appId: '1:423491911419:web:2fc906ccef3da115b83a5e',
}

//firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const Auth = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [signOrLog, setSignOrLog] = React.useState(true)
  let navigate = useNavigate()

  //Redux
  const dispatch = useDispatch()

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        dispatch(userLoggedIn())
        navigate('/Shop', { replace: true })
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(error.message)
      })
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        dispatch(userLoggedIn())
        navigate('/Shop', { replace: true })
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(error.message)
      })
  }

  const switchSignOrLog = () => {
    setSignOrLog(!signOrLog)
    setEmail('')
    setPassword('')
  }

  return (
    <Box className='auth-route'>
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
