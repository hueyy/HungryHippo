if (process.env.NODE_ENV !== `production`) {
  require(`dotenv`).config()
}

const express = require(`express`)
const helmet = require(`helmet`)
const morgan = require(`morgan`)

const routes = require(`./routes`)
const Digestor = require(`./digestor`)

const app = express()

const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(morgan(`combined`))

app.use((req, res, next) => {
  const { type } = req.query
  if (type === Digestor.OutputTypes.ATOM) {
    res.header(`Content-Type`, `application/atom+xml`)
  } else if (type === Digestor.OutputTypes.JSON) {
    res.header(`Content-Type`, `application/json`)
  } else { // type === Digestor.OutputTypes.RSS
    res.header(`Content-Type`, `application/rss+xml`)
  }

  res.header({ 'Cache-Control': `public, max-age=${60 * 10}` }) // standard cache of 10 minutes
  next()
})

app.get(`/`, routes.Home)
app.get(`/twitter/:handle`, routes.Twitter)
app.get(`/instagram/:handle`, routes.Instagram)
app.get(`/facebook/:username`, routes.Facebook)
app.get(`/linkedin/:path/:subpath`, routes.Linkedin)
app.get(`/individual-site/:site/:subsite?`, routes.IndividualSite)

app.listen(
  PORT,
  () => console.log(`HungryHippo listening on port ${PORT}!`)
)