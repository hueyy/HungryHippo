import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Digestor from './digestor'
import Routes from './routes'

const app = express()

const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(morgan(`combined`))

app.use((request, response, next) => {
  if (response.get(`Content-Type`) !== `application/json`) {
    const { type } = request.query
    if (type === Digestor.OutputTypes.ATOM) {
      response.header(`Content-Type`, `application/atom+xml`)
    } else if (type === Digestor.OutputTypes.JSON) {
      response.header(`Content-Type`, `application/json`)
    } else { // type === Digestor.OutputTypes.RSS
      response.header(`Content-Type`, `application/rss+xml`)
    }
  }

  response.header({ 'Cache-Control': `public, max-age=${60 * 10}` }) // standard cache of 10 minutes
  next()
})

app.get(`/`, Routes.Home(app._router.stack))
app.get(`/twitter/:handle`, Routes.Twitter)
app.get(`/instagram/:handle`, Routes.Instagram)
app.get(`/facebook/:username`, Routes.Facebook)
app.get(`/linkedin/:path/:subpath`, Routes.Linkedin)
app.get(`/individual-site`, Routes.IndividualSite)
app.get(`/individual-site/:site/:subsite?`, Routes.IndividualSite)

app.listen(
  PORT,
  () => {
    console.log(`HungryHippo listening on port ${PORT}!`)
  }
)