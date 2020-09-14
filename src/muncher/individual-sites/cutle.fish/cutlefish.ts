import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://cutle.fish`

const cutlefishMuncher = async () => {
  const { data } = await axios.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`main a`).map((_, el) => ({
    title: $(el).text().trim(),
    link: $(el).attr(`href`),
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
  }
}

export default cutlefishMuncher