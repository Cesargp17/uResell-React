import React from 'react'
import { Text } from '@nextui-org/react'

export const Footer = () => {
  return (
    <footer className='text-center'>
        <br />
        <Text className='text-white' h3>2022 - Copyright</Text><br />
        <Text className='text-secondary' h3>Develop by: César Pérez, Roberto Carlos, Joaquin Bogarin, Hector Aguilar</Text><br />
        <img className='imgFooter' src="https://www.utnay.edu.mx/assets/img/utn/logout.png" alt="" />
    </footer>
  )
}