if (process.env.NODE_ENV !== `production`) {
  require(`dotenv`).config()
}

const express = require(`express`)
const routes = require(`./routes`)
const Digestor = require(`./digestor`)

const app = express()

const PORT = process.env.PORT

app.use((req, res, next) => {
  const { type } = req.query
  if (type === Digestor.OutputTypes.ATOM) {
    res.header(`Content-Type`, `application/atom+xml`)
  } else if (type === Digestor.OutputTypes.JSON) {
    res.header(`Content-Type`, `application/json`)
  } else { // type === Digestor.OutputTypes.RSS
    res.header(`Content-Type`, `application/rss+xml`)
  }
  next()
})

app.get(`/twitter/:handle`, routes.Twitter)
app.get(`/instagram/:handle`, routes.Instagram)

app.get(`/individual-site`, routes.IndividualSite)

app.listen(
  PORT,
  () => console.log(`HungryHippo listening on port ${PORT}!`)
)