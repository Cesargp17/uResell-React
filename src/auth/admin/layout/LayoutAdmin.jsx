import React from 'react'
import { Footer } from '../../../UI/Footer'
import { NavBar } from '../../../UI/NavBar'

export const LayoutAdmin = ({ children }) => {
  return (
    <>
        <NavBar/>

            { children }

            <Footer/>
    </>
  )
}
