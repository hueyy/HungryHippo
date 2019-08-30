const Muncher = require(`../muncher`)
const Digestor = require(`../digestor`)

const { Drupal: DrupalMuncher } = Muncher

const instagramFeed = async (req, res) => {
  const { url, type, title, link, description, image } = req.query
  if (!url || url.length === 0) {
    return res.status(400).send(`url not specified`)
  }
  const options = { description, image, link, title }
  const feed = Digestor.assembleFeed(await DrupalMuncher(url, options), type)
  return res.status(200).send(feed)
}

module.exports = instagramFeed
