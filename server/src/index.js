// @flow

import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import { insertImage, getImages, getNearest } from './db'

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({ limit: '100mb' }))

app.get('/images', function(req, res) {
  const { lon, lat } = req.query
  if (!lon || !lat) {
    getImages()
      .then((images) => res.json(images))
      .catch((err) => console.log(err) || res.status('500').send(err))
  } else {
    getNearest(parseFloat(lon, 10), parseFloat(lat, 10))
      .then((images) => res.json(images))
      .catch((err) => console.log(err) || res.status('500').send(err))
  }
})

app.post('/images', function(req, res) {
  insertImage(req.body)
    .then((x) => res.json(x))
    .catch((err) => console.log(err) || res.status('500').send(err))
})

app.listen('3000')
