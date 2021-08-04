import type { RequestHandler } from 'express'
import Digestor from '../digestor'
import Muncher from '../muncher'

const { Facebook: FacebookMuncher } = Muncher

const facebookFeed: RequestHandler = async (request, response) => {
  const { username } = request.params
  if (!username || username.length === 0) {
    return response.status(400).send(`username not specified`)
  }
  const { type }: { type?: string } = request.query
  const feed = Digestor.assembleFeed(await FacebookMuncher(username), type)
  return response.status(200).send(feed)
}

export default facebookFeed
