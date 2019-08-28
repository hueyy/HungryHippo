const individualSiteFeed = (req, res) => {
  const { url } = req.query
  if (!url || url.length === 0) {
    return res.status(400).send(`url not specified`)
  }
}

module.exports = individualSiteFeed
