const Muncher = require(`../muncher`)
const Digestor = require(`../digestor`)

const individualSiteFeed = async (req, res) => {
  const { site, subsite } = req.params
  if (!site || site.length === 0) {
    return res.status(400).send(`site not specified`)
  }

  let IndividualMuncher = Muncher.IndividualSites[site]

  if (subsite && subsite.length > 0) {
    IndividualMuncher = Muncher.IndividualSites[site][subsite]
  }

  const { url, type, title, link, description, image } = req.query
  if (!url || url.length === 0) {
    return res.status(400).send(`url not specified`)
  }
  const options = { description, image, link, title }
  const feed = Digestor.assembleFeed(await IndividualMuncher(url, options), type)
  return res.status(200).send(feed)
}

module.exports = individualSiteFeed
