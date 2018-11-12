import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'src/routes'

const App = () => (
  <div className="grid-container">
    <div className="page-content">
      <Switch>
        {routes.map((route, idx) => (
          <Route key={idx} {...route} />
        ))}
      </Switch>
    </div>
  </div>
)

export default App
