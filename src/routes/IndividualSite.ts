import type { Request, Response } from 'express'
import Digestor from '../digestor'
import Muncher from '../muncher'

const individualSiteFeed = async (request: Request, response: Response) => {
  const { site, subsite } = request.params
  if (!site || site.length === 0) {
    return response.status(400).json({
      error: `site not specified`,
      sites: Object.keys(Muncher.IndividualSites)
    })
  }

  let IndividualMuncher = Muncher.IndividualSites[site]

  if (subsite && subsite.length > 0) {
    IndividualMuncher = Muncher.IndividualSites[site][subsite]
  }

  if(!IndividualMuncher){
    return response.status(400).json({
      error: `Invalid site/subsite`
    })
  }

  const { url, type, title, link, description, image, ...others } = request.query
  if (!url || url.length === 0) {
    console.warn(`url not specified`)
  }
  const options = { description, image, link, title, ...others }
  try {
    const feed = Digestor.assembleFeed(
      await IndividualMuncher(url, options),
      type as string,
    )
    return response.status(200).send(feed)
  } catch (error) {
    return response.status(400).json({
      error: error.message,
      subsites: Object.keys(Muncher.IndividualSites[site])
    })
  }

}

export default individualSiteFeed