import type { RequestHandler } from 'express'
import Digestor from '../digestor'
import Muncher from '../muncher'

const { Linkedin: LinkedinMuncher } = Muncher

const linkedinFeed: RequestHandler = async (request, response) => {
  const { path, subpath } = request.params
  if (!path || path.length === 0) {
    return response.status(400).send(`path not specified`)
  }
  if (!subpath || subpath.length === 0) {
    return response.status(400).send(`subpath not specified`)
  }
  const fullPath = `/${path}/${subpath}`
  const { type }: { type?: string } = request.query
  const feed = Digestor.assembleFeed(await LinkedinMuncher(fullPath), type)
  return response.status(200).send(feed)
}

export default linkedinFeed