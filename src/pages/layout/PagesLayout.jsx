import React from 'react'
import { NavBar } from '../../UI'
import { Footer } from '../../UI/Footer'

export const PagesLayout = ({ children }) => {
  return (
    <>
        <NavBar/>
        { children }

        <Footer/>
    </>
  )
}
