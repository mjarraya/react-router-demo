import React from 'react'
import express from 'express'
import path from 'path'
import fs from 'fs'
import ReactDOM from 'react-dom/server'
import { App } from '../App'

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist/static')))

app.get('*', (req, res) => {
  const filePath = path.resolve(__dirname, 'static', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.log(filePath)
      console.error('err', err);
      return res.status(404).end()
    }

    const html = ReactDOM.renderToString(<App />);

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