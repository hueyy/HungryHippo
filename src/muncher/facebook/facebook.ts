import axios from 'axios'
import cheerio from 'cheerio'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { AssembleFeedOptions } from '../../digestor'

type FacebookMuncher = (username: string) => Promise<AssembleFeedOptions>

dayjs.extend(customParseFormat)

const facebookClient = axios.create({
  baseURL: `https://mobile.facebook.com`
})

const parseFacebookDate = (dateString) => {
  if (dateString.split(` `).length === 5) {
    return dayjs(dateString, `D MMMM YYYY [at] HH:mm`).toDate()
  }
  return dayjs(dateString, `D MMMM [at] HH:mm`).toDate()
}

const facebookMuncher: FacebookMuncher = async username => {
  const resp = await facebookClient.get(`/${username}`)
  const $ = cheerio.load(resp.data)

  const name = $(`#u_0_5`).text().trim()
  const description = $(`meta[property="og:description"]`).attr(`content`)
  const image = $(`meta[property="og:image"]`).attr(`content`)

  const items = $(`#recent>div>div>div`).map((index, element) => {
    const path = $(`div:nth-of-type(2)>div:nth-of-type(2)>a:last-of-type`).attr(`href`)
    return {
      content: $(element).html(),
      date: parseFacebookDate($(`div:nth-of-type(2)>div:first-of-type>abbr`, element).text().trim()),
      link: `https://facebook.com${path}`,
      title: $(`div:first-of-type>div:nth-of-type(2)>span>p`, element).map((pIndex, p) => $(p).text().trim()).get().join(`\n`)
    }
  }).get()

  return {
    description,
    image,
    items,
    link: `https://facebook.com/${username}`,
    title: name
  }
}

export default facebookMuncher