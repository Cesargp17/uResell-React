import React, { useState } from 'react'
import { darkTheme } from './DarkTheme';
import { defaultTheme } from './LightTheme'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }) => {

    const [Theme, setTheme] = useState(defaultTheme);
    const [IconTheme, setIconTheme] = useState(<i className="bi bi-brightness-high"></i>)

    const changeTheme = () => {
        if(Theme === defaultTheme){
            setTheme(darkTheme);
            setIconTheme(<i className="bi bi-brightness-high-fill"></i>)
        }else if(Theme === darkTheme){
            setTheme(defaultTheme);
            setIconTheme(<i className="bi bi-brightness-high"></i>)
        }
    }

  return (
    <>
        <ThemeContext.Provider value={{ changeTheme, Theme: Theme, IconTheme: IconTheme }}>
            { children }
        </ThemeContext.Provider>
    </>
  )
}
