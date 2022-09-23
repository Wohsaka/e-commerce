import React from 'react'
import './style.css'
import { Box, Typography } from '@mui/material'
import aboutImg from '../../../assets/images/perro-pug-en-el-jardin.png'

const About = () => {
  return (
    <Box className='about-container'>
      <Box className='about-title-container'>
        <Typography className='about-title' variant='h4'>
          About us
        </Typography>
      </Box>
      <Box className='about-img-text-container'>
        <img src={aboutImg} alt='pug on garden' className='about-img'></img>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
          repellat natus suscipit. Ipsam molestiae praesentium, ratione dolore,
          ullam harum sequi ut voluptatibus amet quae fugit. Quos eligendi dicta
          sed voluptatibus iusto fugit saepe obcaecati exercitationem
          distinctio, quibusdam tempora maxime corporis ratione laboriosam
          quidem aspernatur magnam molestiae, cum laudantium assumenda
          perspiciatis.
        </Typography>
        <br />
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          laboriosam nam eveniet nostrum nemo molestiae aperiam ducimus, neque
          vitae eum labore itaque hic qui pariatur!
        </Typography>
        <br />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis odio
          nemo velit error deserunt labore consequuntur, aperiam nostrum! Alias
          obcaecati eos facilis sapiente excepturi! Vitae!
        </Typography>
      </Box>
    </Box>
  )
}

export default About
