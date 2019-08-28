const Muncher = require(`../muncher`)
const Digestor = require(`../digestor`)

const { Twitter: TwitterMuncher } = Muncher

const twitterFeed = async (req, res) => {
  const { handle } = req.params
  if (!handle || handle.length === 0) {
    return res.status(400).send(`handle not specified`)
  }
  const feed = Digestor.assembleFeed(await TwitterMuncher(handle))
  return res.status(200).send(feed)
}

module.exports = twitterFeed
