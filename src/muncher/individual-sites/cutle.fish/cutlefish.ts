import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://cutle.fish`

const cutlefishMuncher = async () => {
  const { data } = await Request.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`main a`).map((_, element) => ({
    link: $(element).attr(`href`),
    title: $(element).text().trim(),
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default cutlefishMuncher