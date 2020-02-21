const Muncher = require(`../muncher`)
const Digestor = require(`../digestor`)

const { Linkedin: LinkedinMuncher } = Muncher

const linkedinFeed = async (req, res) => {
  const { path, subpath } = req.params
  if (!path || path.length === 0) {
    return res.status(400).send(`path not specified`)
  }
  if (!subpath || subpath.length === 0) {
    return res.status(400).send(`subpath not specified`)
  }
  const fullPath = `/${path}/${subpath}`
  const { type } = req.query
  const feed = Digestor.assembleFeed(await LinkedinMuncher(fullPath), type)
  return res.status(200).send(feed)
}

module.exports = linkedinFeed