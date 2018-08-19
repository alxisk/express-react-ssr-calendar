import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import * as stores from '../stores'
import App from '../views/App'

const Root = () => (
  <Provider {...stores}>
    <React.Fragment>
      <Router>
        <App />
      </Router>
    </React.Fragment>
  </Provider>
)

hydrate(<Root />, document.getElementById('root'))
