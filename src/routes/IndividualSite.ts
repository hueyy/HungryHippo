import Digestor from '../digestor'
import Muncher from '../muncher'

const individualSiteFeed = async (req, res) => {
  const { site, subsite } = req.params
  if (!site || site.length === 0) {
    return res.status(400).json({
      error: `site not specified`,
      sites: Object.keys(Muncher.IndividualSites)
    })
  }

  let IndividualMuncher = Muncher.IndividualSites[site]

  if (subsite && subsite.length > 0) {
    IndividualMuncher = Muncher.IndividualSites[site][subsite]
  }

  const { url, type, title, link, description, image, ...others } = req.query
  if (!url || url.length === 0) {
    console.warn(`url not specified`)
  }
  const options = { description, image, link, title, ...others }
  try {
    const feed = Digestor.assembleFeed(await IndividualMuncher(url, options), type)
    return res.status(200).send(feed)
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      subsites: Object.keys(Muncher.IndividualSites[site])
    })
  }

}

export default individualSiteFeed