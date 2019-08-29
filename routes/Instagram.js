const Muncher = require(`../muncher`)
const Digestor = require(`../digestor`)

const { Instagram: InstagramMuncher } = Muncher

const instagramFeed = async (req, res) => {
  const { handle } = req.params
  if (!handle || handle.length === 0) {
    return res.status(400).send(`handle not specified`)
  }
  const { type } = req.query
  const feed = Digestor.assembleFeed(await InstagramMuncher(handle), type)
  return res.status(200).send(feed)
}

module.exports = instagramFeed
