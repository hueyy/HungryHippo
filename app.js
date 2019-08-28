if (process.env.NODE_ENV !== `production`) {
  require(`dotenv`).config()
}

const express = require(`express`)
const routes = require(`./routes`)

const app = express()

const PORT = process.env.PORT

app.get(`/twitter/:handle`, routes.Twitter)

app.get(`/individual-site`, routes.IndividualSite)

app.listen(
  PORT,
  () => console.log(`HungryHippo listening on port ${PORT}!`)
)