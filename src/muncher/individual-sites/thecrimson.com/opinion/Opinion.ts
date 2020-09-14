import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.thecrimson.com`
const site = `${BASE_URL}/section/opinion/`

const opinionMuncher = async () => {
  const { data } = await axios.get(site)

  const $ = cheerio.load(data)

  const items = $(`#root .css-ethvi2-CleanParagraphs`).map((_, el) => ({
    title: $(`h1`, el).text().trim(),
    link: BASE_URL + $(`h1 a`, el).attr(`href`),
    content: $(`.preview-content > p`, el).text().trim(),
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: site,
  }
}

export default opinionMuncher