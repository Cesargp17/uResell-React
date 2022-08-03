import React from 'react'
import { Hero, NavBar } from '../../UI'
import { Footer } from '../../UI/Footer'

export const IndexLayout = ({ children }) => {
  return (
    <>
        <NavBar/>
        <Hero/>

        { children }

        <Footer/>
    </>
  )
}
