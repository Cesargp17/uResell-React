import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './themes/ThemeProvider'
import { UResellApp } from './UResellApp'

ReactDOM.createRoot(document.getElementById('root')).render(


    <BrowserRouter>
      <ThemeProvider>
        <UResellApp/>
      </ThemeProvider>
    </BrowserRouter>

)
