// @flow

import express from 'express'
import bodyParser from 'body-parser'
import { insertImage, getImages } from './db'

const app = express()
app.use(bodyParser.json({ limit: '100mb' }))

app.get('/images', function(req, res) {
  const { lon, lat } = req.query
  getImages(parseInt(lon, 10), parseInt(lat, 10))
    .then((images) => res.json(images))
    .catch((err) => console.log(err) || res.status('500').send(err))
})

app.post('/images', function(req, res) {
  insertImage(req.body)
    .then((x) => res.json(x))
    .catch((err) => console.log(err) || res.status('500').send(err))
})

app.listen('3000')
