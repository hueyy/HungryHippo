const Muncher = require(`../muncher`)
const Digestor = require(`../digestor`)

const { Facebook: FacebookMuncher } = Muncher

const instagramFeed = async (req, res) => {
  const { username } = req.params
  if (!username || username.length === 0) {
    return res.status(400).send(`username not specified`)
  }
  const { type } = req.query
  const feed = Digestor.assembleFeed(await FacebookMuncher(username), type)
  return res.status(200).send(feed)
}

module.exports = instagramFeed
