import type { RequestHandler } from 'express'
import Digestor from '../digestor'
import Muncher from '../muncher'

const { Instagram: InstagramMuncher } = Muncher

const instagramFeed: RequestHandler = async (request, response) => {
  const { handle } = request.params
  if (!handle || handle.length === 0) {
    return response.status(400).send(`handle not specified`)
  }
  const { type }: { type?: string } = request.query
  const feed = Digestor.assembleFeed(await InstagramMuncher(handle), type)
  return response.status(200).send(feed)
}

export default instagramFeed
