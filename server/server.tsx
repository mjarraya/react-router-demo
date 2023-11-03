import React from 'react'
import express from 'express'
import path from 'path'
import fs from 'fs'
import ReactDOM from 'react-dom/server'
import { createStaticRouter, createStaticHandler, StaticRouterProvider, StaticHandlerContext } from 'react-router-dom/server'
import { createFetchRequest } from './request'
import { routes } from '../routes'

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist/static')))
app.get('/favicon.ico', (req, res) => res.status(204));

const handler = createStaticHandler(routes);

app.get('*', (req, res) => {
  const filePath = path.resolve(__dirname, '../dist/static', 'index.html');

  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
    if (err) {
      console.log(filePath)
      console.error('err', err);
      return res.status(404).end()
    }
    const fetchRequest = createFetchRequest(req)
    const context = await handler.query(fetchRequest)

    // Accessing matched routes outside of the react rendering tree
    console.log(`Matched routes: ${JSON.stringify((context as StaticHandlerContext).matches.map(match => match.route))}`);

    if (context instanceof Response) {
      throw context;
    }

    const router = createStaticRouter(handler.dataRoutes, context as StaticHandlerContext)
    const html = ReactDOM.renderToString(<React.StrictMode>
      <StaticRouterProvider router={router} context={context as StaticHandlerContext} />
    </React.StrictMode>);

    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
    );

  });
})

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})