
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import RenderRouter from './RenderRouter'
import routerList from './routerlist'

export const history = createBrowserHistory()

function Routing (props) {
  return (
    <Router history={history} >
      <RenderRouter routes={routerList} />
    </Router>
  )
}

export default Routing
