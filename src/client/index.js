import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import * as stores from '../stores'
import App from '../views/App'
import '../styles/index.scss'

const Root = () => (
  <Provider {...stores}>
    <React.Fragment>
      <Router>
        <App />
      </Router>
    </React.Fragment>
  </Provider>
)

const renderMethod = process.env.NODE_ENV === 'production' ? hydrate : render

renderMethod(<Root />, document.getElementById('root'))
