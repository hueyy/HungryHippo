const Home = (req, res) => {
  res.header(`Content-Type`, `text/html`)
  return res.status(200).send(`See the <a href="https://github.com/hueyy/HungryHippo">Github repository here</a>`)
}

module.exports = Home