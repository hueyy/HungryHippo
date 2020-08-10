import Digestor from '../digestor'
import Muncher from '../muncher'

const { Twitter: TwitterMuncher } = Muncher

const twitterFeed = async (req, res) => {
  const { handle } = req.params
  if (!handle || handle.length === 0) {
    return res.status(400).send(`handle not specified`)
  }
  const { type } = req.query
  const feed = Digestor.assembleFeed(await TwitterMuncher(handle), type)
  return res.status(200).send(feed)
}

export default twitterFeed