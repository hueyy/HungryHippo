import type { RequestHandler } from 'express'
import Digestor from '../digestor'
import Muncher from '../muncher'

const { GitHub: GitHubMuncher } = Muncher

const GitHubFeed: RequestHandler = async (request, response) => {
  const {
    q,
    sort = `indexed`,
    order = `desc`,
  }: {
    q?: string,
    sort?: string,
    order?: string,
  } = request.query
  if(!q || q.length === 0){
    return response.status(400).send(`q not specified`)
  }
  const { type }: { type?: string } = request.query
  const feed = Digestor.assembleFeed(await GitHubMuncher({ order, q, sort }), type)
  return response.status(200).send(feed)
}

export default GitHubFeed