import './style.css'
import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className='home-container'>
      <div className='home-call-to-action'>
        <p className='home-p'>
          All your pet needs,
          <br />
          in one place.
        </p>
        <Button
          variant='contained'
          size='large'
          className='home-button'
          onClick={() => navigate('/Shop', { replace: true })}
        >
          shop now
        </Button>
      </div>
    </div>
  )
}

export default Home
