/* eslint-disable import/no-extraneous-dependencies */
import express from 'express'
import path from 'path'
import cors from 'cors'
import proxy from 'http-proxy-middleware'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider, useStaticRendering } from 'mobx-react'
import * as stores from '../stores'
import App from '../views/App'

const app = express()

app.use(cors())

useStaticRendering(true)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
  app.use(
    proxy({
      target: 'http://localhost:4000',
      logLevel: 'error',
    })
  )
}

app.get('*', (req, res) => {
  const context = {}
  const markup = renderToString(
    <Provider {...stores}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
      <title>Calendar-planner</title>
    </head>
    <body>
      <div id="root">${markup}</div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `)
})

app.listen(3000)
