import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import './App.css'
import theme from './theme.js'
import Routing from './routes'

function App (props) {
  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  )
}

export default App
