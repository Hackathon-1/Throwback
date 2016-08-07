// @flow

import rethink from 'rethinkdbdash'
const r = rethink({ servers: [{ host: '54.88.118.223', port: 28015 }] })

type Image = {
  image: string,
  lon: number,
  lat: number,
  elevation: number,
  caption: string
}

export function insertImage({ image, lon, lat, elevation, caption }: Image): Promise<*> {
  return r.table('images')
    .insert({ image, lat, lon, elevation, caption, location: r.point(lon, lat) })
    .run()
}

export function getImages(lon: number, lat: number): Promise<*> {
  return r.table('images')
    .getNearest(r.point(lon, lat), { index: 'location', unit: 'km', maxDist: 1 })
    .without({ doc: 'location' })
    .run()
}
