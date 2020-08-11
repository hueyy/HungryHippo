import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.theedgesingapore.com`

const edgeMuncher = async () => {
  const resp = await axios.get(`${BASE_URL}/section/latest`)

  const $ = cheerio.load(resp.data)

  const items = $(`.content .node-article`).map((_, el) => ({
    title: $(`.news-title`, el).text().trim(),
    content: $(`.news-desc`, el).text().trim(),
    link: BASE_URL + $(`.news-title > a`, el).attr(`href`),
    image: $(`.news-image img`, el).attr(`src`)
  })).get()

  console.log(JSON.stringify(items, null, 2))

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
  }
}

export default edgeMuncher