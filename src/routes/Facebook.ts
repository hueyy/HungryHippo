import Digestor from '../digestor'
import Muncher from '../muncher'

const { Facebook: FacebookMuncher } = Muncher

const facebookFeed = async (req, res) => {
  const { username } = req.params
  if (!username || username.length === 0) {
    return res.status(400).send(`username not specified`)
  }
  const { type } = req.query
  const feed = Digestor.assembleFeed(await FacebookMuncher(username), type)
  return res.status(200).send(feed)
}

export default facebookFeed
